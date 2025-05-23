import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall';
import { Link } from '@tanstack/react-router';
import { Suspense } from 'react';
import { TrashCanConnector } from './connectors/trash-can-connector';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrashCanPage = () => {
    const { t } = useTranslation();
    const user = useUserContext();

    if (!user)
        throw new Response(t('You do not have permission to view this page.'), {
            status: 403,
            statusText: t('You do not have permission to view this page.'),
        });

    return (
        <WallLayout>
            <div className="flex flex-col items-center w-full py-12">
                <div className="flex flex-col container p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold tracking-tight p-4">
                            {t('Trash can')}
                        </h1>
                        <Button asChild>
                            <Link to="/my-posts">
                                <ArrowLeft />
                                {t('Back')}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col container rounded-xl min-h-[calc(100vh-16.25rem)]">
                    <Suspense
                        fallback={
                            <div className="w-full h-24 flex justify-center items-center">
                                <Loader />
                            </div>
                        }
                    >
                        <TrashCanConnector />
                    </Suspense>
                </div>
            </div>
        </WallLayout>
    );
};
