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
            }
        },
    },
    plugins: [], 
};