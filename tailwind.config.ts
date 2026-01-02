// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        neon: "rgb(var(--neon) / <alpha-value>)",
        mint: "rgb(var(--mint) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}

export default config
