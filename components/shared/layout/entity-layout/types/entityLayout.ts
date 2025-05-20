export type Tab = {
  label: string;
  value: string;
};

export interface EntityLayoutProps {
  children: React.ReactNode;
  createComponent?: React.ReactNode;
  createLabel: string;
  currentTab?: string;
  impactNotifications?: React.ReactNode;
  onCreate?: () => void;
  onTabChange?: (value: string) => void;
  showTabs?: boolean;
  subtitle: string;
  tabs?: Tab[];
  title: string;
}
