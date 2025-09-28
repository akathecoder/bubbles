"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FullConnectionItem } from "@/components/tabs/tab-components";
import { NFCScanner } from "@/components/nfc-scanner";
import { SendBubbleSheet } from "@/components/send-bubble-sheet";
import { MOCK_CONNECTIONS } from "@/lib/mock-data";
import { toast } from "sonner";

export function ConnectionsTab() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<(typeof MOCK_CONNECTIONS)[0] | null>(null);
  const [scannedUser, setScannedUser] = useState<{
    address: string;
    ensName?: string;
    avatar?: string;
  } | null>(null);

  const handleScanSuccess = (user: { address: string; ensName?: string; avatar?: string }) => {
    setScannedUser(user);
    setIsSheetOpen(true);
  };

  const handleAddConnection = () => {
    if (scannedUser) {
      // Add to connections list (in real app, this would be an API call)
      toast.success(`Added ${scannedUser.ensName} to your connections!`);
      setIsSheetOpen(false);
      setScannedUser(null);
    }
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
        {MOCK_CONNECTIONS.map((connection, i) => (
          <FullConnectionItem
            key={connection.id}
            connection={connection}
            index={i}
            onSend={(connection) => {
              setSelectedConnection(connection);
              setIsSendSheetOpen(true);
            }}
          />
        ))}
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
            <SheetTitle>New Connection Found!</SheetTitle>
            <SheetDescription>Would you like to add this person to your connections?</SheetDescription>
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
                  <div className="skeu-card flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-3xl">
                    {scannedUser.avatar}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">{scannedUser.ensName}</h3>
                    <p className="font-mono text-sm text-slate-600">
                      {scannedUser.address.slice(0, 6)}...{scannedUser.address.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="skeu-button group relative flex-1 rounded-2xl"
                  onClick={handleAddConnection}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Connection
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
        connection={selectedConnection}
      />
    </motion.div>
  );
}