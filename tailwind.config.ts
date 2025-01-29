import type { Config } from "tailwindcss";

function rgbVar(name: string) {
  return `rgb(var(${name}) / <alpha-value>)`;
}

export default {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: rgbVar("--color-dark-100"),
          400: rgbVar("--color-dark-400"),
          600: rgbVar("--color-dark-600"),
        },
        light: {
          600: rgbVar("--color-light-600"),
          700: rgbVar("--color-light-700"),
          800: rgbVar("--color-light-800"),
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        primary: "var(--font-inter)",
        display: "var(--font-paytone-one)",
      },
      fontSize: {
        xl: ["1.25rem", "1.5"],
        "6xl": ["4rem", "1.15"],
      },
      screens: {
        "2xl": "1400px",
      },
      borderRadius: {
        "6xl": "2.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
