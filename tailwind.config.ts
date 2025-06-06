import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        protest: ['var(--font-protest)'],
      },
    },
  },
  plugins: [],
}

export default config