/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0908",
          900: "#111009",
          800: "#15130F",
          700: "#1C1A15",
          600: "#26231C",
        },
        gold: {
          100: "#F6EBC4",
          300: "#E8C468",
          500: "#C9A227",
          600: "#A6841E",
          800: "#5E4C15",
        },
        bone: {
          100: "#F5F1E6",
          300: "#D9D3C2",
          500: "#9C9689",
          700: "#6B665C",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        needle: {
          "0%": { transform: "rotate(-90deg)" },
          "100%": { transform: "rotate(var(--needle-rot, 45deg))" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(201,162,39,0.25), 0 20px 60px -20px rgba(201,162,39,0.25)",
      },
    },
  },
  plugins: [],
};
