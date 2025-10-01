import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      screens: {
        "can-hover": { raw: "(hover: hover)" },
        xss: "320px",
        xs: "420px",
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#251868",
        },
        gray: {
          DEFAULT: "#6B7280",
          light: "#F3F4F6",
        },
      },
    },
  },
} satisfies Config;
