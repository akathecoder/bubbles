"use client";

import { Wallet, Scan, Users, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "@/components/tabs/home-tab";
import { ScanTab } from "@/components/tabs/scan-tab";
import { ConnectionsTab } from "@/components/tabs/connections-tab";
import { SettingsTab } from "@/components/tabs/settings-tab";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background texture */}
      <div className="texture-noise fixed inset-0 opacity-[0.02]" />

      <div className="flex flex-1 flex-col">
        <Tabs
          defaultValue="home"
          className="flex h-full flex-col"
        >
          <div className="flex-1 overflow-y-auto">
            <TabsContent
              value="home"
              className="mt-0 h-full p-6"
            >
              <HomeTab />
            </TabsContent>

            <TabsContent
              value="scan"
              className="mt-0 h-full p-6"
            >
              <ScanTab />
            </TabsContent>

            <TabsContent
              value="connections"
              className="mt-0 h-full p-6"
            >
              <ConnectionsTab />
            </TabsContent>

            <TabsContent
              value="settings"
              className="mt-0 h-full p-6"
            >
              <SettingsTab />
            </TabsContent>
          </div>

          {/* Bottom Navigation */}
          <TabsList className="fixed bottom-0 grid h-20 w-full grid-cols-4 rounded-none border-t border-slate-200 bg-white/95 backdrop-blur-sm">
            <TabsTrigger
              value="home"
              className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
            >
              <Wallet className="h-5 w-5" />
              <span className="text-xs font-medium">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="scan"
              className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
            >
              <Scan className="h-5 w-5" />
              <span className="text-xs font-medium">Scan</span>
            </TabsTrigger>
            <TabsTrigger
              value="connections"
              className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs font-medium">Connections</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
