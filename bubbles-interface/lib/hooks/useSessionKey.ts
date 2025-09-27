import React, { use, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const useSessionKey = () => {
  const [sessionKey, setSessionKey] = useLocalStorage<`0x${string}` | undefined>("bubbles-session-key", undefined);
  const walletClient = useMemo(() => {
    if (!sessionKey) return undefined;
    return privateKeyToAccount(sessionKey);
  }, [sessionKey]);

  console.log("walletClient", walletClient?.address);

  return { walletClient, setSessionKey, sessionKey };
};

export default useSessionKey;
