import { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';

export const GlobalLoader = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        setIsDarkTheme(
            window.document.documentElement.classList.contains('dark'),
        );
    }, [theme]);

    return (
        <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-full z-10">
            {isDarkTheme ? (
                <img
                    src="/logo-dark.webp"
                    alt="Loader"
                    className="animate-pulse-2 w-auto h-64"
                />
            ) : (
                <img
                    src="/logo.png"
                    alt="Loader"
                    className="animate-pulse-2 w-auto h-60"
                />
            )}
        </div>
    );
};
