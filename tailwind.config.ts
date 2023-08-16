import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      serif: ['var(--font-alice)', 'serif', ...defaultTheme.fontFamily.serif],
      sans: ['var(--font-lato)', 'sans-serif', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        neutral: {
          0: '#000',
          10: '#191c1a',
          20: '#2e312e',
          25: '#393c39',
          30: '#444844',
          35: '#505350',
          40: '#5c5f5c',
          50: '#757874',
          60: '#8f918e',
          70: '#a9aca8',
          80: '#c5c7c3',
          90: '#e1e3df',
          95: '#eff1ed',
          98: '#f8faf5',
          99: '#fbfdf8',
          100: '#fff',
        },
        primary: {
          0: '#000',
          10: '#002112',
          20: '#003822',
          25: '#00452a',
          30: '#005233',
          35: '#005f3c',
          40: '#006c45',
          50: '#108859',
          60: '#39a371',
          70: '#57be8a',
          80: '#73daa4',
          90: '#90f7bf',
          95: '#c0ffd8',
          98: '#e8ffee',
          99: '#f4fff5',
          100: '#fff',
        },
      },
      letterSpacing: {
        widest: '0.25rem',
      },
    },
  },
};

export default config;
