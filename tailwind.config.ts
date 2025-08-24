// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Pulled from your current site’s logo/graphics (approx values)
          aqua:  "#39c1e8", // “shades” light aqua
          blue:  "#0e76bb", // primary mid-blue
          navy:  "#2d405c", // deep navy
          indigo:"#2c2e68", // the dark bar under the logo
          gray:  "#58595b", // neutral gray used in text/accents
          white: "#ffffff"
        },
        // optional accent if you want small highlights
        accent: { yellow: "#ffde17" }
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(0,0,0,.25)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      container: { center: true, padding: "1rem" }
    }
  },
  plugins: []
} satisfies Config;
