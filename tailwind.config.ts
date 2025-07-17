import type { Config } from "tailwindcss";

const config = {
  mode: "jit",
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
      height: {
        dvh: "100dvh",
      },
      scale: {
        "80": "0.8",
        "70": "0.7",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "secondary-light": "hsl(var(--secondary-light))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "secondary-main": "hsl(var(--secondary-main))",
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
        success: "hsl(var(--success-green))",
        "dark-purple": "hsl(var(--dark-purple))",
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
        h1: [
          "clamp(64px, 5vw, 96px)",
          { lineHeight: "120%", letterSpacing: "-1.5px", fontWeight: "clamp(400, 600, 700)" },
        ],
        h2: ["clamp(40px, 3.5vw, 60px)", { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: 700 }],
        h3: ["clamp(32px, 2.5vw, 48px)", { lineHeight: "120%", letterSpacing: "0px", fontWeight: 700 }],
        h4: ["clamp(24px, 1.5vw, 32px)", { lineHeight: "120%", letterSpacing: "0.25px", fontWeight: 700 }],
        h5: ["clamp(18px, 1.2vw, 24px)", { lineHeight: "120%", letterSpacing: "0px", fontWeight: 700 }],
        h6: ["clamp(16px, 1vw, 20px)", { lineHeight: "160%", letterSpacing: "0.15px", fontWeight: 700 }],
        btn: [
          "clamp(0.875rem, calc((1rem + 1vw)/1.5), 1rem)",
          { lineHeight: "clamp(1rem, calc((1rem + 1vw)/1.5), 1.25rem)" },
        ],
        p: [
          "clamp(0.875rem, calc((1rem + 1vw)/1.5), 1rem)",
          { lineHeight: "clamp(1.125rem, calc((1rem + 1vw)/1.5), 1.5rem)" },
        ],
        a: [
          "clamp(0.875rem, calc((1rem + 1vw)/1.5), 1rem)",
          { lineHeight: "clamp(1.125rem, calc((1rem + 1vw)/1.5), 1.5rem)" },
        ],
        body1: ["clamp(1rem, calc((1rem + 1vw)/1.5), 1.25rem)", { lineHeight: "150%", letterSpacing: "0.15px" }],
        body2: ["clamp(0.875rem, calc((1rem + 1vw)/1.5), 1rem)", { lineHeight: "140%", letterSpacing: "0.15px" }],
        subtitle1: ["clamp(1, calc((1rem + 1vw)/1.5), 1.25rem)", { lineHeight: "140%", letterSpacing: "0.15px" }],
        subtitle2: ["clamp(0.875rem, calc((1rem + 1vw)/1.5), 1rem)", { lineHeight: "160%", letterSpacing: "0.1px" }],
        overline: ["clamp(0.75rem, calc((1rem + 1vw)/1.5), 0.875rem)", { lineHeight: "200%", letterSpacing: "1px" }],
        caption: ["clamp(0.75rem, calc((1rem + 1vw)/1.5), 0.875rem)", { lineHeight: "140%", letterSpacing: "0.4px" }],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
