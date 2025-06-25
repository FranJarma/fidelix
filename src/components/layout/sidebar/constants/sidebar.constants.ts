import {
  Analytics as AnalyticsIcon,
  Dashboard as DashboardIcon,
  CardGiftcard as GiftIcon,
  NotificationAdd as NotificationsIcon,
  Settings as SettingsIcon,
  People as UsersIcon,
} from "@mui/icons-material";

import type { SidebarItemProps } from "./../types/sidebar.types";

export const menuItems: SidebarItemProps[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    permissions: ["read"],
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: UsersIcon,
    permissions: ["manage_clients"],
  },
  {
    label: "Promociones",
    path: "/promociones",
    icon: GiftIcon,
    permissions: ["manage_promotions"],
  },
  {
    label: "Notificaciones",
    path: "/notificaciones",
    icon: NotificationsIcon,
    permissions: ["manage_notifications"],
  },
  {
    label: "Estadísticas",
    path: "/estadisticas",
    icon: AnalyticsIcon,
    permissions: ["manage_statistics"],
  },
  {
    label: "Mi cuenta",
    path: "/mi-cuenta",
    icon: SettingsIcon,
    permissions: ["my_account"],
  },
];

export const SIDEBAR_CONSTANTS = {
  WIDTH: {
    COLLAPSED: 72, // px
    EXPANDED: 280, // px
  },
  TOOLTIP: {
    CLOSE_SIDEBAR: "Cerrar barra lateral",
    OPEN_SIDEBAR: "Abrir barra lateral",
  },
};
