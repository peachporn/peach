module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        fadeSlide: {
          '0%': { transform: 'translateY(10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide .3s ease forwards',
      },
      fontSize: {
        '2xs': '.55rem',
      },
      colors: {
        yellow: {
          DEFAULT: '#FEC534',
        },
        purple: {
          DEFAULT: '#817EEA',
        },
        pink: {
          lightest: '#FFC2D2',
          lighter: '#FF7096',
          DEFAULT: '#FF1654',
          darker: '#CC0036',
          darkest: '#7A0021',
        },
        offBlack: {
          DEFAULT: '#1C1A1F',
        },
      },
      boxShadow: {
        '-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      gridTemplateColumns: {
        '1/3': 'minmax(0, 3fr) minmax(0, 1fr)',
      },
    },
    fontFamily: {
      display: 'Pacifico,serif',
      sans: 'Gudea,serif',
    },
  },
  variants: {},
  plugins: [],
};
