import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall';
import { UsersConnector } from './connectors/users-connector';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, Suspense } from 'react';
import { debounce } from '@/utils/debounce';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Loader } from '@/components/loader/loader';
import { AddUserDialog } from '@/pages/admin/dialogs/add-user-dialog';
import { useTranslation } from 'react-i18next';

interface PageParams {
    search?: string;
    page?: string;
}

export const AdminPage = () => {
    const { t } = useTranslation();
    const user = useUserContext();
    const navigate = useNavigate();

    const params: PageParams = useSearch({
        strict: false,
    });

    const [onSearch] = debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            navigate({
                search: {
                    page: undefined,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any,
            });
            return;
        }

        if (e.target.value.length < 3) return;

        navigate({
            search: {
                page: undefined,
                search: e.target.value,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        });
    }, 300);

    if (user?.type !== 'ADMIN')
        throw new Response(t('You do not have permission to view this page.'), {
            status: 403,
            statusText: t('You do not have permission to view this page.'),
        });

    return (
        <WallLayout>
            <div className="container px-4 mx-auto pt-6">
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
                    {t('You do not have permission to view this page.')}
                </h1>

                <div className="flex justify-between pt-3 pb-4 gap-4">
                    <div className="relative w-full max-w-64">
                        <Input
                            placeholder={t('Search users')}
                            onChange={onSearch}
                            defaultValue={params.search}
                        />
                        <div className="absolute right-0 top-0 p-2">
                            <MagnifyingGlassIcon className="size-5" />
                        </div>
                    </div>

                    <AddUserDialog>
                        <Button>
                            {t('Create user')}
                            <PlusIcon />
                        </Button>
                    </AddUserDialog>
                </div>
                <Suspense
                    fallback={
                        <div className="w-full h-[calc(100vh-12.25rem)] flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                >
                    <UsersConnector />
                </Suspense>
            </div>
        </WallLayout>
    );
};
