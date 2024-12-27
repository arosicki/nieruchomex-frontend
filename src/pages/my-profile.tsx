import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall';
import { Suspense } from 'react';
import { Loader } from '@/components/loader/loader';
import { MyProfileConnector } from './connectors/my-profile-connector';

const STRINGS = {
    NO_PERMISSION: 'You do not have permission to view this page.',
};

export const MyProfilePage = () => {
    const user = useUserContext();

    if (!user)
        throw new Response(STRINGS.NO_PERMISSION, {
            status: 403,
            statusText: STRINGS.NO_PERMISSION,
        });

    return (
        <WallLayout>
            <div className="flex flex-col items-center w-full py-12 gap-8">
                <div className='className="flex flex-col container rounded-xl'></div>
            </div>
        </WallLayout>
    );
};
