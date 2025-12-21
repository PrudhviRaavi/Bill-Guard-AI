/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    hover: "var(--primary-hover)",
                    glow: "var(--primary-glow)",
                },
                card: {
                    bg: "var(--card-bg)",
                    hover: "var(--card-bg-hover)",
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
