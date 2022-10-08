/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Wavehaus: ["Poiret One", "serif"],
      },
      colors: {
        grayish: "#e2e2e2",
        mostlyblack: "#222",
        blackish: "#343a40",
      },
    },
  },
  plugins: [],
};
