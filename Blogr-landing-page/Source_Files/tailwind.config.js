/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                "red-500": "hsl(356, 100%, 66%)",
                "red-400": "hsl(355, 100%, 74%)",
                "red-550": "hsl(353, 100%, 62%)",
                "blue-900": "hsl(208, 49%, 24%)",
                "gray-600": "hsl(207, 13%, 34%)",
                "gray-900": "hsl(240, 10%, 16%)",
                "orange-300": "hsl(13, 100%, 72%)",
                "purple-950": "hsl(237, 17%, 21%)",
                "purple-900": "hsl(237, 23%, 31%)",
            },
            fontFamily: {
                overpass: ["Overpass", "sans-serif"],
                ubuntu: ["Ubuntu", "sans-serif"],
            },
            fontSize: {
                body: "16px",
            },
        },
    },
    plugins: [],
};
