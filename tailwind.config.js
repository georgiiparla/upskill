// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // This line is crucial for next-themes to work
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			// You can add dark-mode specific colors here if needed later
		},
	},
	plugins: [],
};
