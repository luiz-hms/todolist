/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: {
      '@tailwindcss/postcss': {}, // ✅ Tailwind v4 requer isso
      autoprefixer: {},
    },
  }
  