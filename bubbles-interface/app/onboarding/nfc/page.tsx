"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NFCAnimation } from "@/components/ui/nfc-animation";
import { CommandResponse, KeyInfo2 } from "@/lib/halo";
import { baseBundlerRpc, basePaymasterRpc, entryPoint, kernelAddresses, kernelVersion } from "@/lib/utils";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { useMutation } from "@tanstack/react-query";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { createWalletClient, http, keccak256, toHex } from "viem";
import { base } from "viem/chains";
import { usePublicClient } from "wagmi";
import { useLocalStorage } from "usehooks-ts";
import { privateKeyToAccount } from "viem/accounts";
import useSessionKey from "@/lib/hooks/useSessionKey";

export default function NFCPage() {
  const router = useRouter();
  const [nfcAddress, setNfcAddress] = useLocalStorage("nfcAddress", "");
  const { sessionKey, setSessionKey, walletClient } = useSessionKey();

  const basePublicClient = usePublicClient({
    chainId: base.id,
  });
  const basePaymasterClient = useMemo(() => {
    if (!basePublicClient) return null;
    return createZeroDevPaymasterClient({
      chain: base,
      transport: http(basePaymasterRpc),
    });
  }, [basePublicClient]);

  const {
    data: nfcData,
    isPending,
    error: nfcError,
    mutateAsync: getNfcAddress,
  } = useMutation({
    mutationKey: ["tap nfc"],
    mutationFn: async () => {
      if (!basePublicClient) throw new Error("No public client");
      const paymasterClient = createZeroDevPaymasterClient({
        chain: base,
        transport: http(basePaymasterRpc),
      });
      if (!basePaymasterClient) throw new Error("No paymaster client");
      if (!paymasterClient) throw new Error("No paymaster client");
      // const nfcAddress = (await execHaloCmdWeb({
      //   name: "get_pkeys",
      // })) as Promise<{ etherAddresses: Record<string, `0x${string}`> }>;

      // const signature = (await execHaloCmdWeb({
      //   name: "sign",
      //   keyNo: 1,
      //   message: keccak256("0xb00b1e5"),
      // })) as CommandResponse;

      const data = (await execHaloCmdWeb({
        name: "get_key_info",
        keyNo: 1,
      })) as KeyInfo2;

      toast.success(`NFC Tag scanned: ${data.attestSig}`);

      const pkey = keccak256(toHex(data.attestSig)) as `0x${string}`;
      const sessionKeyAccount = privateKeyToAccount(pkey);

      const sessionKeyKernelAccount = await createKernelAccount(basePublicClient, {
        entryPoint: entryPoint,
        kernelVersion: kernelVersion,
        eip7702Account: sessionKeyAccount,
        eip7702Auth: await sessionKeyAccount.signAuthorization({
          address: kernelAddresses.accountImplementationAddress,
          chainId: base.id,
          nonce: 0,
        }),
      });

      const sessionKeyKernelAccountClient = createKernelAccountClient({
        account: sessionKeyKernelAccount,
        chain: base,
        bundlerTransport: http(baseBundlerRpc),
        paymaster: basePaymasterClient,
        client: basePublicClient,
      });

      toast.success("Setting up your account");

      const tx = await sessionKeyKernelAccountClient.sendTransaction({
        calls: [
          {
            to: "0x0000000000000000000000000000000000000000",
            value: BigInt(0),
          },
        ],
      });

      console.log("7702 tx hash:", tx);

      return {
        address: sessionKeyAccount.address,
        pkey: pkey,
      };
    },
    onSuccess: (data) => {
      toast.success("Wristband connected!");
      setNfcAddress(data.address);
      setSessionKey(data.pkey);
      return data;
    },
    onError: (error) => {
      toast.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    },
  });

  const handleDone = () => {
    router.push("/onboarding/create-profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          delay: 0.2,
        }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {!nfcData && !isPending && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <h1
                className="font-borel mb-4 text-4xl font-bold tracking-tight text-slate-800"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                Connect Wristband
              </h1>
            </motion.div>

            {/* NFC Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-12"
            >
              <NFCAnimation />
            </motion.div>

            {/* Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => getNfcAddress()}
                size="lg"
                className="skeu-button font-borel h-16 w-full rounded-3xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                <span className="-mb-2 align-text-bottom text-xl leading-0">Connect Wristband ✨</span>
                <ArrowRight className="ml-2 h-5 w-5" />
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </motion.div>
          </>
        )}

        {isPending && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1
                className="font-borel mb-4 text-4xl font-bold tracking-tight text-slate-800"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                Connecting...
              </h1>
              <p className="text-lg font-medium text-slate-600">Hold your wristband close to the back of your phone</p>
            </motion.div>

            {/* Scanning Animation */}
            <NFCAnimation
              size="md"
              className="mb-12"
            />
          </>
        )}

        {!!nfcData && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1
                className="font-borel mb-4 text-4xl font-bold tracking-tight text-slate-800"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                Connected! ✨
              </h1>
              <p className="text-lg font-medium text-slate-600">
                You're all set to make instant connections by tapping wristbands
              </p>
            </motion.div>

            {/* Success Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12"
            >
              <div className="skeu-card mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100 text-6xl">
                ✅
              </div>
            </motion.div>

            {/* Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <Card className="skeu-card rounded-3xl border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                <CardHeader className="pb-3 text-center">
                  <div className="mb-2 text-3xl">🔗</div>
                  <CardTitle className="text-lg font-bold text-slate-800">Ready to Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-600">
                    Now when you meet someone with a Bubbles wristband, just tap them together to instantly connect!
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Address Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 w-full"
            >
              <div className="skeu-card rounded-2xl bg-slate-50 p-4">
                <p className="mb-1 text-xs text-slate-500">Connected Address:</p>
                <p className="font-mono text-sm break-all text-slate-700">
                  {nfcData.address.slice(0, 6)}...{nfcData.address.slice(-4)}
                </p>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                onClick={handleDone}
                size="lg"
                className="skeu-button font-borel h-16 w-full rounded-3xl"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                <span className="-mb-2 align-text-bottom text-xl leading-0">Continue ✨</span>
                <ArrowRight className="ml-2 h-5 w-5" />
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </motion.div>
          </>
        )}
        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i <= 0 ? "bg-blue-500" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// const {
//   mutate: sign7702,
//   error: sign7702Error,
//   data: sign7702Data,
//   isPending: isSign7702Pending,
// } = useMutation({
//   mutationFn: async () => {
//     if (!basePublicClient) throw new Error("No public client");
//     if (!basePaymasterClient) throw new Error("No paymaster client");
//     // const nfcData = await getNfcAddress();
//     // const authorisationData = await prepareAuthorization(basePublicClient, {
//     //   account: nfcData as `0x${string}`,
//     //   address: kernelAddresses.accountImplementationAddress,
//     // });

//     // const authRequest = {
//     //   chainId: base.id,
//     //   address: kernelAddresses.accountImplementationAddress,
//     //   nonce: 0,
//     // };
//     // const hash = hashAuthorization(authRequest);
//     // const signature = (await execHaloCmdWeb({
//     //   name: "sign",
//     //   keyNo: 1,
//     //   digest: hash.slice(2),
//     // })) as CommandResponse;
//     // console.log("auth", { signature });

//     // const authorisationZerodevData: SignedAuthorization = {
//     //   ...authRequest,
//     //   r: `0x${signature.signature.raw.r}`,
//     //   s: `0x${signature.signature.raw.s}`,
//     //   v: BigInt(signature.signature.raw.v),
//     // };

//     // const verified = await verifyAuthorization({
//     //   authorization: authorisationZerodevData,
//     //   address: signature.etherAddress,
//     // });

//     // console.log("AUTH VERIFIED", verified);

//     // const _sessionPrivateKey = generatePrivateKey();
//     // const sessionAccount = privateKeyToAccount(_sessionPrivateKey as `0x${string}`);
//     // const sessionKeySigner = await toECDSASigner({
//     //   signer: sessionAccount,
//     // });
//     // const permissionPlugin = await toPermissionValidator(basePublicClient, {
//     //   entryPoint: entryPoint,
//     //   kernelVersion: kernelVersion,
//     //   signer: sessionKeySigner,
//     //   policies: [toSudoPolicy({})],
//     // });
//     // console.log("PERMISSION PLUGIN CREATED", permissionPlugin);
//     // const validatorNonce = await getKernelV3Nonce(basePublicClient, signature.etherAddress);
//     // const typedData = await getPluginsEnableTypedData({
//     //   accountAddress,
//     //   chainId,
//     //   kernelVersion: version,
//     //   action,
//     //   hook,
//     //   validator: regular,
//     //   validatorNonce,
//     // });
//     // const sessionkernelAccount = await createKernelAccount(basePublicClient, {
//     //   // eip7702Account: nfcData,
//     //   address: signature.etherAddress as `0x${string}`,
//     //   entryPoint: entryPoint,
//     //   kernelVersion: kernelVersion,
//     //   eip7702Auth: authorisationZerodevData,
//     //   plugins: {
//     //     regular: permissionPlugin,
//     //   },
//     // });

//     // console.log("KERNEL ACCOUNT CREATED", sessionkernelAccount);

//     // const kernelAccountClient = createKernelAccountClient({
//     //   account: sessionkernelAccount,
//     //   chain: base,
//     //   bundlerTransport: http(baseBundlerRpc),
//     //   paymaster: basePaymasterClient,
//     //   client: basePublicClient,
//     // });

//     // console.log("kernelAccountClient created", kernelAccountClient);

//     // const tx = await kernelAccountClient.sendTransaction({
//     //   calls: [
//     //     {
//     //       to: zeroAddress,
//     //       value: BigInt(0),
//     //     },
//     //   ],
//     // });

//     // window.alert(`7702 tx hash: ${tx}`);

//     // const sessionKeyKernelAccount = await createKernelAccount(publicClient, {
//     //   entryPoint,
//     //   eip7702Account: signer,
//     //   plugins: {
//     //     regular: permissionPlugin,
//     //   },
//     //   kernelVersion: kernelVersion,
//     //   address: masterKernelAccountClient.account.address,
//     // });
//     // return signature;
//   },
//   onError: (error) => {
//     toast.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
//     console.error(error);
//   },
//   onSuccess: (data) => {
//     toast.success("7702 Signed!");
//     return data;
//   },
// });
