import { useEffect, useState } from 'react';
import logoLight from '/logo.png';
import logoDark from '/logo-dark.webp';

export const GlobalLoader = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        setIsDarkTheme(
            window.document.documentElement.classList.contains('dark'),
        );
    }, []);

    return (
        <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-full z-10">
            {isDarkTheme ? (
                <img
                    src={logoDark}
                    alt="Loader"
                    className="animate-pulse-2 w-auto h-64"
                />
            ) : (
                <img
                    src={logoLight}
                    alt="Loader"
                    className="animate-pulse-2 w-auto h-60"
                />
            )}
        </div>
    );
};
