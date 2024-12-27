import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall';
import { UserPostsConnector } from './connectors/posts-connector';
import { useParams } from '@tanstack/react-router';
import { UserHeadingConnector } from './connectors/heading-connector';
import { Skeleton } from '../../components/skeleton/skeleton';
import $ from './user.module.scss';
import { Loader } from '../../components/loader/loader';

export const UserPage = () => {
    const { userId } = useParams({
        from: '/users/$userId',
    });

    return (
        <WallLayout>
            <Suspense
                fallback={
                    <Skeleton height="2.4375rem" className={$.skeleton} />
                }
            >
                <UserHeadingConnector userId={+userId} />
            </Suspense>
            <Suspense
                fallback={
                    // TODO: Maybe post skeleton
                    <div className={$.loadingContainer}>
                        <Loader />
                    </div>
                }
            >
                <UserPostsConnector userId={+userId} />
            </Suspense>
        </WallLayout>
    );
};
