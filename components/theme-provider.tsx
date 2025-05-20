"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  setTheme: (theme: "light" | "dark") => void;
  setThemeColor: (color: string) => void;
  theme: "light" | "dark";
  themeColor: string;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
  themeColor: "#1e40af", // Color azul por defecto
  setThemeColor: () => {},
});

export const ThemeProvider = ({
  children,
  ...props
}: {
  attribute?: string;
  children: React.ReactNode;
  defaultTheme?: "system" | "light" | "dark";
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeColor, setThemeColor] = useState<string>("#1e40af"); // Color azul por defecto

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const storedColor = localStorage.getItem("themeColor");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = storedTheme || systemTheme;
    const initialColor = storedColor || "#1e40af";

    setTheme(initialTheme);
    setThemeColor(initialColor);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);

    // Actualizar las variables CSS para el color primario
    document.documentElement.style.setProperty("--primary-color", themeColor);

    // Convertir el color hexadecimal a HSL para usarlo en Tailwind
    const hexToHSL = (hex: string) => {
      // Convertir hex a RGB
      let r = 0,
        g = 0,
        b = 0;
      if (hex.length === 4) {
        r = Number.parseInt(hex[1] + hex[1], 16);
        g = Number.parseInt(hex[2] + hex[2], 16);
        b = Number.parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = Number.parseInt(hex.substring(1, 3), 16);
        g = Number.parseInt(hex.substring(3, 5), 16);
        b = Number.parseInt(hex.substring(5, 7), 16);
      }

      // Convertir RGB a HSL
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      return { h, s, l };
    };

    const hsl = hexToHSL(themeColor);

    // Actualizar las variables CSS para Tailwind
    document.documentElement.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);

    // Calcular el color de texto apropiado (blanco o negro) según el brillo del color
    const brightness = hsl.l / 100;
    const textColor = brightness > 0.6 ? "240 10% 3.9%" : "0 0% 98%";
    document.documentElement.style.setProperty("--primary-foreground", textColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
