import { Home } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

export const Logo = ({ className }: Props) => {
    const { t } = useTranslation();

    return (
        <Button
            variant="ghost"
            className={cn(
                'rounded-none py-6 flex items-center text-lg font-medium hover:bg-transparent',
                className,
            )}
            asChild
        >
            <Link to="/">
                <Home size={24} className="min-w-6 min-h-6" />
                {t('Nieruchomex')}
            </Link>
        </Button>
    );
};
