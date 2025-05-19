"use client";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FiArrowDownCircle, FiArrowUpCircle, FiPlus } from "react-icons/fi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

interface Tab {
  label: string;
  value: string;
}

interface EntityLayoutProps {
  title: string;
  subtitle: string;
  createLabel: string;
  onCreate?: () => void;
  createComponent?: React.ReactNode;
  showTabs?: boolean;
  tabs?: Tab[];
  currentTab?: string;
  onTabChange?: (value: string) => void;
  impactNotifications?: React.ReactNode;
  children: React.ReactNode;
}

export function EntityLayout({
  title,
  subtitle,
  createLabel,
  onCreate,
  createComponent,
  showTabs = false,
  tabs = [],
  currentTab,
  onTabChange,
  impactNotifications,
  children,
}: EntityLayoutProps) {
  const [showImpactNotifications, setShowImpactNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-2">
        <h2 className="text-lg font-medium">{subtitle}</h2>
        <div className="block md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowImpactNotifications((open) => !open)}
            className="flex items-center gap-2"
          >
            {showImpactNotifications ? (
              <FiArrowUpCircle />
            ) : (
              <FiArrowDownCircle />
            )}
            <span className="text-sm font-medium">
              {showImpactNotifications ? "Ocultar resumen" : "Ver resumen"}
            </span>
          </Button>
        </div>

        <Collapsible open={showImpactNotifications} defaultOpen>
          <CollapsibleContent
            id="impact-notifications"
            className="collapsible-animation md:max-h-none md:block"
          >
            {impactNotifications}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="px-6 py-2 flex justify-end">
        {createComponent ? (
          createComponent
        ) : (
          <Button size="sm" onClick={onCreate}>
            <FiPlus className="mr-2 h-4 w-4" />
            {createLabel}
          </Button>
        )}
      </div>

      <main className="flex-1 p-6 space-y-6">
        {showTabs && tabs.length > 0 ? (
          <Tabs
            defaultValue={currentTab ?? tabs[0].value}
            onValueChange={onTabChange}
            className="space-y-4"
          >
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={currentTab ?? tabs[0].value}>
              {children}
            </TabsContent>
          </Tabs>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
