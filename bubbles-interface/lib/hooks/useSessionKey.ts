import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { privateKeyToAccount } from "viem/accounts";

const useSessionKey = () => {
  const [sessionKey, setSessionKey] = useLocalStorage<`0x${string}` | undefined>("bubbles-session-key", undefined);
  const walletClient = useMemo(() => {
    if (!sessionKey) return undefined;
    const acc = privateKeyToAccount(sessionKey);
    console.log("Account from session key:", acc);
    return acc;
  }, [sessionKey]);

  return { walletClient, setSessionKey, sessionKey };
};

export default useSessionKey;
