import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jungle-orange': '#C85614',
        'jungle-orange-light': '#F15A2B',
        'jungle-yellow': '#FFB700',
        'jungle-dark': '#1a1a1a',
      },
      fontFamily: {
        'geometric': ['Arial', 'Helvetica', 'sans-serif'], // Placeholder for geometric font
      }
    },
  },
  plugins: [],
}
export default config
