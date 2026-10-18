import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F17",
        surface: {
          DEFAULT: "#111827",
          subtle: "#161F30",
          card: "#0F1420",
        },
        border: {
          DEFAULT: "#1E293B",
          subtle: "#1E293B80",
        },
      },
    },
  },
  plugins: [],
};
export default config;
