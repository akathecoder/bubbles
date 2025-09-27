import { KERNEL_V3_3 } from "@zerodev/sdk/constants";
import { KernelVersionToAddressesMap } from "@zerodev/sdk/constants";
import { getEntryPoint } from "@zerodev/sdk/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROJECT_ID = "fefe0be1-b3db-4eff-bbb7-750485bd732c";
export const kernelVersion = KERNEL_V3_3;
export const kernelAddresses = KernelVersionToAddressesMap[kernelVersion];
export const sepoliaBundlerRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/11155111`;
export const sepoliaPaymasterRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/11155111`;
export const baseSepoliaBundlerRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/84532`;
export const baseSepoliaPaymasterRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/84532`;
export const entryPoint = getEntryPoint("0.7");
