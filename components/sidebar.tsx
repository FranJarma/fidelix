"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart3, Bell, Home, LogOut, Moon, Settings, Sun, Tag, Users } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const pathname = usePathname();
  const { setTheme, theme, themeColor } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [businessConfig, setBusinessConfig] = useState<{
    logo: string;
    name: string;
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
      <SidebarHeader className="flex items-center px-4 py-6">
        <div className="flex w-full items-center gap-3">
          <div className="relative ml-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={businessConfig.logo || "/placeholder.svg?height=40&width=40"}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="truncate text-xl font-bold">{businessConfig.name}</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {menuItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="sidebar-hover"
                style={{
                  backgroundColor: pathname === item.href ? `${themeColor}15` : undefined,
                }}
              >
                <Link href={item.href} className="flex w-full items-center">
                  <div className="ml-2 flex h-8 w-8 items-center justify-center">
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
      <SidebarFooter className="mt-auto p-4">
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={toggleTheme} className="sidebar-hover">
              <button className="flex w-full items-center">
                <div className="ml-2 flex h-8 w-8 items-center justify-center">
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Moon className="h-5 w-5 flex-shrink-0" />
                  )}
                </div>
                <span className="truncate">{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="sidebar-hover">
              <button className="flex w-full items-center">
                <div className="ml-2 flex h-8 w-8 items-center justify-center">
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
