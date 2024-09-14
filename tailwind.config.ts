import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "opacity-04": "hsla(328, 100%, 45%, 0.04)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-label": "hsl(var(--text-label))",
        "text-disabled": "hsl(var(--text-disabled))",
        error: "hsl(var(--error))",
        "border-gray": "hsl(var(--border-gray))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        h1: ["96px", { lineHeight: "116%", letterSpacing: "-1.5px" }],
        h2: ["60px", { lineHeight: "120%", letterSpacing: "-0.5px" }],
        h3: ["48px", { lineHeight: "120%", letterSpacing: "0px" }],
        h4: ["34px", { lineHeight: "120%", letterSpacing: "0.25px" }],
        h5: ["24px", { lineHeight: "120%", letterSpacing: "0px" }],
        h6: ["20px", { lineHeight: "160%", letterSpacing: "0.15px" }],
        body1: ["16px", { lineHeight: "150%", letterSpacing: "0.15px" }],
        body2: ["14px", { lineHeight: "140%", letterSpacing: "0.15px" }],
        subtitle1: ["16px", { lineHeight: "140%", letterSpacing: "0.15px" }],
        subtitle2: ["14px", { lineHeight: "160%", letterSpacing: "0.1px" }],
        overline: ["12px", { lineHeight: "200%", letterSpacing: "1px" }],
        caption: ["12px", { lineHeight: "160%", letterSpacing: "0.4px" }],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
