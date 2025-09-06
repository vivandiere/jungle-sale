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
        'jungle': ['NaN Serf Sans Pan African', 'sans-serif'],
        'geometric': ['Arial', 'Helvetica', 'sans-serif'], // Placeholder for geometric font
      },
      fontWeight: {
        'light': '300',
        'normal': '400', 
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
    },
  },
  plugins: [],
}
export default config
