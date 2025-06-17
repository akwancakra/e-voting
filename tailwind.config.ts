import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            monument: ["var(--font-monument)"],
        },
        extend: {
            colors: {
                "pimary-dpurple": "#53389E",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#7F56D9",
                    "base-100": "#ffffff",
                },
            },
            {
                dark: {
                    primary: "#B696FE",
                    "base-100": "#1d232a",
                },
            },
            "light",
            "dark",
            "cmyk",
        ],
        darkTheme: "light",
    },
};
export default config;
