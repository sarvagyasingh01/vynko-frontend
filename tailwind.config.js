/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:1001',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
}

