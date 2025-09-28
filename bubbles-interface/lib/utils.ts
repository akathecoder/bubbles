import { getEntryPoint, KERNEL_V3_3, KernelVersionToAddressesMap } from "@zerodev/sdk/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROJECT_ID = process.env.NEXT_PUBLIC_PID;
export const kernelVersion = KERNEL_V3_3;

export const kernelAddresses = KernelVersionToAddressesMap[kernelVersion];
export const baseBundlerRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/8453`;
export const basePaymasterRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/8453`;
export const arbitrumBundlerRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/42161`;
export const arbitrumPaymasterRpc = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/42161`;
export const entryPoint = getEntryPoint("0.7");
