// filepath: /home/ethan/Moonlight-Radiance-front-end-design/moonlight-radiance-web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a365d',
          secondary: '#2d3748',
          moonlight: {
            100: '#f7fafc',
            // 你的主题色系
          }
        }
      },
    },
    plugins: [],
  }