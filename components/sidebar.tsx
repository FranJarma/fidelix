"use client";

import {
  BarChart3,
  Users,
  Tag,
  Bell,
  Settings,
  LogOut,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, themeColor } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [businessConfig, setBusinessConfig] = useState<{
    name: string;
    logo: string;
    primaryColor?: string;
  }>({
    name: "FidelizaClientes",
    logo: "/placeholder.svg?height=40&width=40",
  });

  useEffect(() => {
    const storedConfig = localStorage.getItem("businessConfig");
    if (storedConfig) {
      setBusinessConfig(JSON.parse(storedConfig));
    }
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Estadísticas",
      icon: BarChart3,
      href: "/estadisticas",
    },
    {
      title: "Clientes",
      icon: Users,
      href: "/clientes",
    },
    {
      title: "Promociones",
      icon: Tag,
      href: "/promociones",
    },
    {
      title: "Notificaciones",
      icon: Bell,
      href: "/notificaciones",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/configuracion",
    },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center py-6 px-4">
        <div className="flex items-center gap-3 w-full">
          <div className="relative w-8 h-8 overflow-hidden rounded-md flex-shrink-0 ml-2">
            <Image
              src={businessConfig.logo || "/placeholder.svg?height=40&width=40"}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold truncate">{businessConfig.name}</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="sidebar-hover"
                style={{
                  backgroundColor:
                    pathname === item.href ? `${themeColor}15` : undefined,
                }}
              >
                <Link href={item.href} className="w-full flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center ml-2">
                    <item.icon
                      className="h-5 w-5 flex-shrink-0"
                      style={{ color: businessConfig.primaryColor }}
                    />
                  </div>
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={toggleTheme}
              className="sidebar-hover"
            >
              <button className="w-full flex items-center">
                <div className="w-8 h-8 flex items-center justify-center ml-2">
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Moon className="h-5 w-5 flex-shrink-0" />
                  )}
                </div>
                <span className="truncate">
                  {theme === "dark" ? "Modo claro" : "Modo oscuro"}
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="sidebar-hover">
              <button className="w-full flex items-center">
                <div className="w-8 h-8 flex items-center justify-center ml-2">
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                </div>
                <span className="truncate">Cerrar sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  );
}
