import type { Context } from "hono";
import { HttpRequestError, verifyMessage, zeroAddress, type Hex } from "viem";
import { createKysely } from "../db/kysely.js";
import { ZodNameWithSignature } from "../models.js";
import {
  decodeEnsOffchainRequest,
  encodeEnsOffchainResponse,
  type ResolverQuery,
} from "../utils/ccip.js";
import { get } from "../utils/db/get.js";
import { set } from "../utils/db/set.js";
import { parseNameFromDb } from "../utils/db/utils.js";

const DB: Record<string, Hex> = {
  "sparsh.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
  "0xsparsh.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
  "0xsparsh.base.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
};

export async function getRecord(name: string, query: ResolverQuery) {
  const { functionName, args } = query;

  let res: string;
  interface NameData {
    addresses?: Record<string, string>;
    texts?: Record<string, string>;
    contenthash?: string;
  }

  const nameData = (await get(name)) as NameData | null;

  switch (functionName) {
    case "addr": {
      const coinType = args[1] ?? BigInt(60);
      res = nameData?.addresses?.[coinType.toString()] ?? zeroAddress;
      break;
    }
    case "text": {
      const key = args[1];
      res = nameData?.texts?.[key] ?? "";
      break;
    }
    case "contenthash": {
      res = nameData?.contenthash ?? "0x";
      break;
    }
    default: {
      throw new Error(`Unsupported query function ${functionName}`);
    }
  }

  return res;
}

export async function getEnsAddressUsingCCIPLookup(
  sender: Hex,
  data: Hex
): Promise<string> {
  try {
    const { name, query } = decodeEnsOffchainRequest({
      sender,
      data,
    });
    const result = await getRecord(name, query);
    if (!result) {
      console.warn("ENS Lookup query not found in DB", { name, query });
    } else {
      console.info("ENS Lookup Success", { name, query, result });
    }

    const encodedResponse = await encodeEnsOffchainResponse(
      {
        sender,
        data,
      },
      result,
      process.env.ENS_LOOKUP_PRIVATE_KEY as Hex
    );

    return encodedResponse;
  } catch (error) {
    console.error(error);

    const isHttpRequestError = error instanceof HttpRequestError;
    const errMessage = isHttpRequestError ? error.message : "Unable to resolve";
    throw new Error(errMessage);
  }
}

export async function getName(name: string) {
  const nameData = await get(name);

  if (nameData === null) {
    throw new Error("Data not found");
  }

  return nameData;
}

export async function getNames() {
  const db = createKysely();
  const names = await db.selectFrom("names").selectAll().execute();
  const parsedNames = parseNameFromDb(names);

  console.log(parsedNames);

  // Simplify the response format
  const formattedNames = parsedNames.reduce(
    (acc: Record<string, any>, name) => {
      acc[name.name] = {
        addresses: name.addresses,
        texts: name.texts,
        contenthash: name.contenthash,
      };
      return acc;
    },
    {}
  );

  console.log(formattedNames);

  return formattedNames;
}

export async function setName(c: Context): Promise<Response> {
  const body = await c.req.json();
  const safeParse = ZodNameWithSignature.safeParse(body);

  if (!safeParse.success) {
    const response = { success: false, error: safeParse.error };
    return Response.json(response, { status: 400 });
  }

  const { signature, expiration } = safeParse.data;
  const { name, owner } = signature.message;

  // Only allow 3LDs, no nested subdomains
  if (name.split(".").length !== 3) {
    const response = { success: false, error: "Invalid name" };
    return Response.json(response, { status: 400 });
  }

  // Validate signature
  try {
    const isVerified = await verifyMessage({
      address: owner as Hex,
      message: JSON.stringify(signature.message),
      signature: signature.hash as Hex,
    });

    if (!isVerified) {
      throw new Error("Invalid signer");
    }
  } catch (err) {
    console.error(err);
    const response = { success: false, error: err };
    return Response.json(response, { status: 401 });
  }

  // Check the signature expiration
  const now = Math.floor(Date.now());

  if (expiration < now) {
    const response = {
      success: false,
      error: "Signature expired",
    };
    return Response.json(response, { status: 401 });
  }

  // Check if the name is already taken
  const existingName = await get(name);

  // If the name is owned by someone else, return an error
  if (existingName && existingName.owner !== owner) {
    const response = { success: false, error: "Name already taken" };
    return Response.json(response, { status: 409 });
  }

  // Save the name
  try {
    await set(signature.message);
    const response = { success: true };
    return Response.json(response, { status: 201 });
  } catch (err) {
    console.error(err);
    const response = { success: false, error: "Error setting name" };
    return Response.json(response, { status: 500 });
  }
}
