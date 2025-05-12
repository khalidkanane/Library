/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      container : {
        padding : {
          DEFAULT : '1rem',
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          '2xl' : '6rem' ,
        },
      },
    },
  },
   plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/line-clamp')
  ],

  darkMode:"class"
}