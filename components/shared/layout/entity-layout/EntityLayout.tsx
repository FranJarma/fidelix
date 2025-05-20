"use client";
import { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle, FiPlus } from "react-icons/fi";

import { EntityLayoutProps } from "./types/entityLayout";

import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export function EntityLayout({
  children,
  createComponent,
  createLabel,
  currentTab,
  impactNotifications,
  onCreate,
  onTabChange,
  showTabs = false,
  subtitle,
  tabs = [],
  title,
}: EntityLayoutProps) {
  const [showImpactNotifications, setShowImpactNotifications] = useState(true);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </header>

      <div className="space-y-2 px-6 py-6">
        <h2 className="text-lg font-medium">{subtitle}</h2>
        <div className="block md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowImpactNotifications(open => !open)}
            className="flex items-center gap-2"
          >
            {showImpactNotifications ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
            <span className="text-sm font-medium">
              {showImpactNotifications ? "Ocultar resumen" : "Ver resumen"}
            </span>
          </Button>
        </div>

        <Collapsible open={showImpactNotifications} defaultOpen>
          <CollapsibleContent
            id="impact-notifications"
            className="collapsible-animation md:block md:max-h-none"
          >
            {impactNotifications}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="flex justify-end px-6 py-2">
        {createComponent ? (
          createComponent
        ) : (
          <Button size="sm" onClick={onCreate}>
            <FiPlus className="mr-2 h-4 w-4" />
            {createLabel}
          </Button>
        )}
      </div>

      <main className="flex-1 space-y-6 p-6">
        {showTabs && tabs.length > 0 ? (
          <Tabs
            defaultValue={currentTab ?? tabs[0].value}
            onValueChange={onTabChange}
            className="space-y-4"
          >
            <TabsList>
              {tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={currentTab ?? tabs[0].value}>{children}</TabsContent>
          </Tabs>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
