module.exports = {
  darkMode: 'class',
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      // boxShadow: {
      //   custom: '0 2px 20px 0 rgba(0, 0, 0, 0.1)',
      // },
      colors: {
        paktum: {
        50: '#ecfdf5',
        100: '#d1fae4',
        200: '#a6f4ce',
        300: '#6de8b4',
        400: '#32d594',
        500: '#10d38d',
        600: '#039866',
        700: '#037955',
        800: '#056043',
        900: '#054f39',
        950: '#022c21',
        },
      },
      screens: {
        xs: '440px',
      },
    },
  },
  variants: {},
  //
};