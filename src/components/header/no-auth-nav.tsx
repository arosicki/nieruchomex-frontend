import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';
import { useTranslation } from 'react-i18next';

export const NoAuthNav = () => {
    const { t } = useTranslation();

    return (
        <nav className="flex mr-4 items-center">
            <ThemeToggle />
            <Button variant="link" asChild>
                <Link to="/sign-in">{t('Sign in')}</Link>
            </Button>
            <Button asChild>
                <Link to="/sign-up">{t('Sign up')}</Link>
            </Button>
        </nav>
    );
};
