import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';
import { useTranslation } from 'react-i18next';
import { LangToggle } from '../lang-toggle';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { BREAKPOINTS } from '@/config';

export const NoAuthNav = () => {
    const { t } = useTranslation();

    const isSmall = useMediaQuery(BREAKPOINTS.sm);

    if (isSmall) {
        return (
            <nav className="flex mr-2 items-center gap-1">
                <LangToggle />
                <ThemeToggle />
                <Button asChild data-testid="sign-in-button">
                    <Link to="/sign-in">{t('Sign in')}</Link>
                </Button>
            </nav>
        );
    }

    return (
        <nav className="flex mr-4 items-center gap-1">
            <LangToggle />
            <ThemeToggle />
            <Button variant="link" asChild data-testid="sign-in-button">
                <Link to="/sign-in">{t('Sign in')}</Link>
            </Button>
            <Button asChild data-testid="sign-up-button">
                <Link to="/sign-up">{t('Sign up')}</Link>
            </Button>
        </nav>
    );
};
