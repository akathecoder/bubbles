"use client";

import { motion } from "motion/react";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble } from "@/components/ui/bubble";
import { useEnsUser } from "@/lib/hooks/useEnsUser";
import { MockBubbleHistory, MockConnection, StoredConnection } from "@/lib/mock-data";

// Component to handle individual bubble history items with ENS data
export function BubbleHistoryItem({
  bubble,
  userAddress,
  index,
}: {
  bubble: MockBubbleHistory;
  userAddress?: `0x${string}`;
  index: number;
}) {
  const user = useEnsUser(userAddress);
  const isLoading = user?.isLoading;

  return (
    <motion.div
      key={bubble.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
    >
      <Bubble
        type={bubble.type}
        size="md"
        variant="default"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">
            {bubble.status === "received" ? "From" : "To"}{" "}
            {isLoading ? (
              <div className="inline-block h-4 w-20 animate-pulse rounded bg-slate-200"></div>
            ) : (
              user?.displayName || "Unknown"
            )}
          </span>
          <Badge
            variant={bubble.status === "received" ? "default" : "secondary"}
            className={`rounded-full text-xs ${bubble.status === "received" ? "border-green-200 bg-green-100 text-green-700" : "border-blue-200 bg-blue-100 text-blue-700"}`}
          >
            {bubble.status === "received" ? "+" : "-"}${bubble.amount}
          </Badge>
        </div>
        <p className="text-xs text-slate-500">{bubble.timestamp}</p>
      </div>

      <Avatar className="h-8 w-8">
        {isLoading ? (
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200"></div>
        ) : (
          <>
            <AvatarImage src={user?.avatar || undefined} />
            <AvatarFallback>{user?.displayName?.[0]?.toUpperCase() || "?"}</AvatarFallback>
          </>
        )}
      </Avatar>
    </motion.div>
  );
}

// Component to handle individual connection items with ENS data
export function ConnectionItem({ connection, index }: { connection: MockConnection; index: number }) {
  const user = useEnsUser(connection.address);
  const isLoading = user?.isLoading;

  return (
    <motion.div
      key={connection.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
    >
      <Avatar className="h-10 w-10">
        {isLoading ? (
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200"></div>
        ) : (
          <>
            <AvatarImage src={user?.avatar || undefined} />
            <AvatarFallback>{user?.displayName?.[0]?.toUpperCase() || "?"}</AvatarFallback>
          </>
        )}
      </Avatar>

      <div className="flex-1">
        <div className="font-bold text-slate-800">
          {isLoading ? (
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200"></div>
          ) : (
            user?.displayName || "Unknown"
          )}
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-slate-800">{connection.bubblesReceived} received</div>
        <div className="text-xs text-slate-500">{connection.bubblesSent} sent</div>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
      >
        <Gift className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

// Component for full connection cards in the connections tab
export function FullConnectionItem({
  connection,
  index,
  onSend,
}: {
  connection: StoredConnection;
  index: number;
  onSend: (connection: StoredConnection) => void;
}) {
  const user = useEnsUser(connection.address);
  const isLoading = user?.isLoading;

  return (
    <motion.div
      key={connection.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="skeu-card rounded-3xl p-6"
    >
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-6">
        <div className="flex items-center gap-3 sm:contents">
          <Avatar className="h-12 w-12 flex-shrink-0">
            {isLoading ? (
              <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200"></div>
            ) : (
              <>
                <AvatarImage src={user?.avatar || undefined} />
                <AvatarFallback>{user?.displayName?.[0]?.toUpperCase() || "?"}</AvatarFallback>
              </>
            )}
          </Avatar>

          <div className="min-w-0 flex-1 sm:contents">
            <div>
              <div className="text-lg font-bold text-slate-800">
                {isLoading ? (
                  <div className="h-5 w-32 animate-pulse rounded bg-slate-200"></div>
                ) : (
                  user?.displayName || "Unknown"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden gap-6 sm:flex">
          <div className="text-center">
            <div className="font-bold text-green-600">{connection.bubblesReceived}</div>
            <div className="text-xs text-green-600">received</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-600">{connection.bubblesSent}</div>
            <div className="text-xs text-slate-500">sent</div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-green-600">{connection.bubblesReceived}</div>
              <div className="text-xs text-green-600">received</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-600">{connection.bubblesSent}</div>
              <div className="text-xs text-slate-500">sent</div>
            </div>
          </div>

          <Button
            className="skeu-button group relative gap-2 rounded-2xl"
            onClick={() => onSend(connection)}
          >
            <Gift className="h-4 w-4" />
            Send Bubble
            <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>
        </div>

        <Button
          className="skeu-button group relative hidden gap-2 rounded-2xl sm:flex"
          onClick={() => onSend(connection)}
        >
          <Gift className="h-4 w-4" />
          Send Bubble
          <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Button>
      </div>
    </motion.div>
  );
}
