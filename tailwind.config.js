/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // Center the container
      padding: '1rem', // Default padding for all screens
      screens: {
        sm: '600px', // Full width on small screens
        md: '700px', // Custom width on medium screens
        lg: '990px', // Custom width on large screens
        xl: '1050px', // Custom width on extra-large screens
        '2xl': '1200px', // Custom width on 2XL screens
      },
    },
    extend: {
      boxShadow: {
        'product': '0px 0px 8px #8f5b5b4f',
        
      }
    },
  },
  plugins: [],
}

