"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FullConnectionItem } from "@/components/tabs/tab-components";
import { NFCScanner } from "@/components/nfc-scanner";
import { SendBubbleSheet } from "@/components/send-bubble-sheet";
import { StoredConnection } from "@/lib/mock-data";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

import { toast } from "sonner";

export function ConnectionsTab() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<StoredConnection | null>(null);
  const [scannedUser, setScannedUser] = useState<{
    address: `0x${string}`;
    ensName?: string;
    avatar?: string;
  } | null>(null);

  // localStorage for user connections
  const [storedConnections, setStoredConnections] = useLocalStorage<StoredConnection[]>("bubbles-connections", []);

  // Use only stored connections
  const allConnections = storedConnections;

  const handleScanSuccess = (user: { address: `0x${string}`; ensName?: string; avatar?: string }) => {
    setScannedUser(user);
    setIsSheetOpen(true);
  };

  const handleAddConnection = () => {
    // Connection is already added by NFC scanner, just close the sheet
    setIsSheetOpen(false);
    setScannedUser(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <h1
          className="text-2xl font-bold text-slate-800"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          My Connections
        </h1>
        <NFCScanner
          onScanSuccess={handleScanSuccess}
          buttonText="Add Connection"
          buttonIcon={<Plus className="h-4 w-4" />}
          buttonSize="sm"
          buttonClassName="skeu-button rounded-2xl relative group"
        />
      </motion.div>

      <div className="space-y-4">
        {allConnections.length === 0 ? (
          <div className="skeu-card rounded-3xl p-8 text-center">
            <p className="text-slate-600">No connections yet. Scan someone's NFC tag to add them!</p>
          </div>
        ) : (
          allConnections.map((connection, i) => (
            <FullConnectionItem
              key={connection.id}
              connection={connection}
              index={i}
              onSend={(selectedConn) => {
                setSelectedConnection(selectedConn);
                setIsSendSheetOpen(true);
              }}
            />
          ))
        )}
      </div>

      {/* NFC Scan Result Sheet */}
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <SheetContent
          side="bottom"
          className="max-h-[80vh]"
        >
          <SheetHeader>
            <SheetTitle>Connection Added!</SheetTitle>
          </SheetHeader>

          {scannedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 pt-2"
            >
              {/* User Profile Preview */}
              <div className="skeu-card mb-6 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={scannedUser.avatar} />
                    <AvatarFallback className="text-lg font-bold text-slate-800">
                      {scannedUser.ensName?.[0]?.toUpperCase() || scannedUser.address.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">{scannedUser.ensName || "Unknown User"}</h3>
                    <p className="font-mono text-sm text-slate-600">
                      {scannedUser.address.slice(0, 6)}...{scannedUser.address.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="skeu-button group relative flex-1 rounded-2xl"
                  onClick={handleAddConnection}
                >
                  Got it!
                  <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Button>
              </div>
            </motion.div>
          )}
        </SheetContent>
      </Sheet>

      {/* Send Bubble Sheet */}
      <SendBubbleSheet
        open={isSendSheetOpen}
        onOpenChange={setIsSendSheetOpen}
        connectionAddress={selectedConnection?.address || null}
      />
    </motion.div>
  );
}
