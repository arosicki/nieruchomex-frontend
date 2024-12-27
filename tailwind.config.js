/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colorScheme: {
                dark: 'color-scheme: dark',
                light: 'color-scheme: light',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                draft: {
                    DEFAULT: 'hsla(var(--draft))',
                    foreground: 'hsla(var(--draft-foreground))',
                },
                published: {
                    DEFAULT: 'hsla(var(--active))',
                    foreground: 'hsla(var(--active-foreground))',
                },
                archived: {
                    DEFAULT: 'hsla(var(--archived))',
                    foreground: 'hsla(var(--archived-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
                brand: {
                    DEFAULT: 'hsl(var(--brand))',
                    foreground: 'hsl(var(--brand-foreground))',
                },
                highlight: {
                    DEFAULT: 'hsl(var(--highlight))',
                    foreground: 'hsl(var(--highlight-foreground))',
                },
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                'pulse-2': {
                    '0%, 100%': {
                        transform: 'scale(0.95)',
                        opacity: '0.75',
                    },
                    '50%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-2': 'pulse-2 1.5s infinite',
            },
            screens: {
                'main-hover': {
                    raw: '(hover: hover)',
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss/plugin')(function ({ addUtilities }) {
            const newUtilities = {
                '.color-scheme-dark': {
                    colorScheme: 'dark',
                },
                '.color-scheme-light': {
                    colorScheme: 'light',
                },
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        }),
        require('tailwind-scrollbar-hide'),
    ],
};
