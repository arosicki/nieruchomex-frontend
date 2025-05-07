import { Link } from '@tanstack/react-router';
import { Header } from '../components/header/header';
import { Home } from 'lucide-react';
import { useCurrentUser } from '../api/users/use-current-user';
import { UserProvider } from '../context/user-context';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const NOT_FOUND_STATUS_CODE = '404';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    const { data } = useCurrentUser();

    return (
        <UserProvider value={data.data}>
            <Header />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-3.75rem)] gap-3">
                <h1 className="text-4xl font-semibold">
                    {NOT_FOUND_STATUS_CODE}
                </h1>
                <div className="border-b w-40" />
                <h2 className="text-xl font-medium">{t('Page not found')}</h2>
                <p className="my-4 text-center max-w-lg mx-12">
                    {t(
                        'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.',
                    )}
                </p>
                <Button asChild>
                    <Link to="/">
                        <Home />
                        {t('Home page')}
                    </Link>
                </Button>
            </div>
        </UserProvider>
    );
};
