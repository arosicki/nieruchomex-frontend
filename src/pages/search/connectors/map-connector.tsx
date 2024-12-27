import { usePosts } from '../../../api/posts/use-posts';
import { MapPoints } from '@/components/map/map-points';

export const MapPointsConnector = () => {
    const { data } = usePosts({
        status: ['PUBLISHED'],
    });

    return <MapPoints posts={data.data} />;
};
