/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/**/*.html',],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
  		animation: {
  			aurora: "aurora 60s linear infinite",
  		},
  		keyframes: {
  			aurora: {
  				from: {
  					backgroundPosition: "50% 50%, 50% 50%",
  				},
  				to: {
  					backgroundPosition: "350% 50%, 350% 50%",
  				},
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

