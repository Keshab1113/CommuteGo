const {
	default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode:['class', "class"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
  		keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: 0,
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			},
  			meteor: {
  				'0%': {
  					transform: 'rotate(var(--angle)) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(var(--angle)) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			meteor: 'meteor 5s linear infinite',
  			grid: 'grid 15s linear infinite'
  		}
  	}
  },
  plugins: [
      require("tailwindcss-animate"),
	  addVariablesForColors
],
}

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }