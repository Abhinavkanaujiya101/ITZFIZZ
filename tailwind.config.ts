import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090d",
        foreground: "#f4f5f8",
        accent: {
          cyan: "#00F2FE",
          purple: "#7F00FF",
          electric: "#4FACFE",
          magenta: "#FF0844",
          lime: "#00FF87",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "neon-cyan": "0 0 25px rgba(0, 242, 254, 0.4)",
        "neon-purple": "0 0 35px rgba(127, 0, 255, 0.4)",
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.15) 0%, transparent 70%)",
        "mesh-gradient": "radial-gradient(at 0% 0%, rgba(127, 0, 255, 0.25) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 242, 254, 0.25) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
