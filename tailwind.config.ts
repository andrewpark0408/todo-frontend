import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        'gray-900': '#0D0D0D',
        'gray-800': '#1A1A1A',
        'gray-700': '#262626',
        'gray-600': '#333333',
        'gray-100': '#F2F2F2',
        'gray-200': '#D9D9D9',
        'gray-300': '#808080',

        // Accent blues/purples
        'blue-light': '#4EA8DE',
        'blue-dark': '#1E6F9F',
        'purple-light': '#8284FA',
        'purple-dark': '#5E60CE',

        // Example for tasks circles
        'red-task': '#FF3B30',
        'orange-task': '#FF9500',
        'yellow-task': '#FFCC00',
        'green-task': '#34C759',
        'blue-task': '#007AFF',
        'indigo-task': '#5856D6',
        'purple-task': '#AF52DE',
        'pink-task': '#FF2D55',
        'brown-task': '#A2845E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;
