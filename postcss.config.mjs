const config = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We define our custom palette here
        bassy: {
          orange: "#F97316",      // Main warm orange
          "orange-dark": "#C2410C", // Darker orange for hover effects
          green: "#064E3B",       // Deep football green (headers)
          "green-light": "#ECFCCB", // Very light green hue (backgrounds)
        },
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  
  },
};

export default config;
