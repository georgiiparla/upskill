module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'csway': {
                    'green': '#22a55e',
                    'orange': '#f3b75a',
                    'red': '#e37a7b',
                }
            },
            animation: {
                'glow-breathe': 'breathe 8s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                first: "moveVertical 30s ease infinite",
                second: "moveInCircle 20s reverse infinite",
                third: "moveInCircle 40s linear infinite",
                fourth: "moveHorizontal 40s ease infinite",
                fifth: "moveInCircle 20s ease infinite",
            },
            keyframes: {
                // [!] UPDATED: Lowered intensity
                breathe: {
                    '0%, 100%': { opacity: '0.1' }, // Base: Visible, but soft
                    '50%': { opacity: '0.2' },      // Peak: Reduced from 0.8 back to 0.6
                },
                moveHorizontal: {
                    "0%": { transform: "translateX(-50%) translateY(-10%)" },
                    "50%": { transform: "translateX(50%) translateY(10%)" },
                    "100%": { transform: "translateX(-50%) translateY(-10%)" },
                },
                moveVertical: {
                    "0%": { transform: "translateY(-50%)" },
                    "50%": { transform: "translateY(50%)" },
                    "100%": { transform: "translateY(-50%)" },
                },
                moveInCircle: {
                    "0%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(180deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
        },
    },
    plugins: [],
};