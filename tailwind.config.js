module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "landing-dark": "hsl(45, 93%, 30%)",
        "landing": "hsl(45, 93%, 47%)",
        "landing-bright": "hsl(45, 93%, 55%)",


        // Primary Colors
        "forest-green": "#539241", // Deep Forest Green
        "aqua-blue": "#5fb9c3", // Soft Aqua Blue
        "warm-gold": "#D4AF37", // Warm Gold
        "earthy-copper": "#B87333", // Earthy Copper

        // Secondary Colors
        "sky-blue": "#87CEEB", // Calm Sky Blue
        "sage-green": "#6A994E", // Muted Sage Green
        "peach-coral": "#f77366", // Peach Coral
        "brick-red": "#a33136", // Brick Red
        "sand-beige": "#ebb154", // Sand Beige

        // Text & Background
        "dark-text": "#1A1A1A", // Near-Black for text
        "mint-white": "#e6fbf4", // Soft Mint White for background
        silver: "#C0C0C0", // Silver for icons & borders

        // Theme colors mapping
        primary: "#539241", // Deep Forest Green as primary
        secondary: "#5fb9c3", // Soft Aqua Blue as secondary
        accent: "#D4AF37", // Warm Gold as accent

        // Semantic colors
        peace: "#5fb9c3", // Soft Aqua Blue
        love: "#f77366", // Peach Coral
        harmony: "#6A994E", // Muted Sage Green

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#e6fbf4", // Soft Mint White
        foreground: "#1A1A1A", // Near-Black

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#C0C0C0", // Silver
          foreground: "#1A1A1A", // Near-Black
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        montserrat: ["montserrat"],
        lora: ["lora"]
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

