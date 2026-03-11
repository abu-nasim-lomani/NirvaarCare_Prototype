/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: '#1A5C8C', dark: '#0D3A5C', light: '#EAF2F8' },
                accent: { DEFAULT: '#F4A836', light: '#FFF8EC' },
                emergency: '#DC2626',
                success: '#16A34A',
                bg: '#F8F7F4',
            },
            fontFamily: {
                sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
                bengali: ['Hind Siliguri', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
            },
        },
    },
    plugins: [],
}
