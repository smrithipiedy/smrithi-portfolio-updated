import type { Config } from "tailwindcss";

export default {
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
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom portfolio colors
        lavender: {
          DEFAULT: "hsl(var(--lavender))",
          glow: "hsl(var(--lavender-glow))",
          muted: "hsl(var(--lavender-muted))",
        },
        "purple-deep": "hsl(var(--purple-deep))",
        "pink-soft": "hsl(var(--pink-soft))",
        "cyan-code": "hsl(var(--cyan-code))",
        silver: "hsl(var(--silver))",
        // Spider-punk paper colors
        "paper-cream": "hsl(var(--paper-cream))",
        "paper-pink": "hsl(var(--paper-pink))",
        "paper-yellow": "hsl(var(--paper-yellow))",
        "paper-cyan": "hsl(var(--paper-cyan))",
        "ink-black": "hsl(var(--ink-black))",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(270 50% 70% / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(270 50% 70% / 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "typing-cursor": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        // Spider-punk animations
        jitter: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(0.5px, -0.5px) rotate(0.3deg)" },
          "50%": { transform: "translate(-0.5px, 0.5px) rotate(-0.3deg)" },
          "75%": { transform: "translate(0.5px, 0.5px) rotate(0.2deg)" },
          "100%": { transform: "translate(-0.5px, -0.5px) rotate(-0.2deg)" },
        },
        "paper-drop": {
          "0%": { opacity: "0", transform: "translateY(-50px) rotate(-10deg)" },
          "60%": { opacity: "1", transform: "translateY(5px) rotate(3deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "typing-cursor": "typing-cursor 1s step-end infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "progress-fill": "progress-fill 1s ease-out forwards",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        jitter: "jitter 0.15s steps(2) infinite",
        "paper-drop": "paper-drop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-lavender": "linear-gradient(135deg, hsl(var(--lavender)), hsl(var(--pink-soft)))",
        "gradient-card": "linear-gradient(180deg, hsl(260 25% 14%), hsl(260 25% 10%))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
