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
        squish: {
          '0%': {
            transform: 'translate3d(0, -50%, 0) scaleY(1);',
          },
          '95%': {
            transform: 'translate3d(0, 0, 0) scaleY(1);',
          },
          '100%': {
            transform: 'translate3d(0, 5%, 0) scaleY(0.9) scaleX(1.2);',
          },
        },
      },
      animation: {
        squish: 'squish .7s cubic-bezier(.5, .05, 1, .5) infinite alternate',
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
        tintBlack: {
          DEFAULT: 'rgba(0,0,0,.2)',
        },
      },
      boxShadow: {
        '-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      gridTemplateColumns: {
        '3/1': 'minmax(0, 3fr) minmax(0, 1fr)',
        '1/2': 'minmax(0, 1fr) minmax(0, 2fr)',
        100: 'repeat(100, 1fr)',
      },
      minHeight: {
        32: '8rem',
      },
      maxWidth: {
        'screen/2': '50vw',
      },
      minWidth: {
        'screen/2': '50vw',
      },
    },
    fontFamily: {
      display: 'Pacifico,serif',
      sans: 'Gudea,serif',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
