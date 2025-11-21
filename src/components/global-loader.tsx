import { useEffect, useState } from 'react';
import logoLight from '/logo.png';
import logoDark from '/logo-dark.webp';

export const GlobalLoader = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const dark = document.documentElement.classList.contains('dark');
        setIsDarkTheme(dark);

        const observer = new MutationObserver(() => {
            setIsDarkTheme(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const logoSrc = isDarkTheme ? logoDark : logoLight;
    const logoHeight = isDarkTheme ? 'h-64' : 'h-60';

    return (
        <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-full z-10">
            <img
                src={logoSrc}
                alt="Loader"
                className={`animate-pulse-2 w-auto ${logoHeight}`}
            />
        </div>
    );
};
