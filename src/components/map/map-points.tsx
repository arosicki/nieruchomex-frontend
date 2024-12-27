import { Post } from '@/api/models/post';
import { BREAKPOINTS } from '@/config';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { Marker } from 'react-leaflet';

interface Props {
    posts: Post[];
}

export const MapPoints = ({ posts }: Props) => {
    const isMobile = useMediaQuery(BREAKPOINTS.lg);

    return posts.map((post) => (
        <Marker
            key={post.id}
            position={[post.latitude, post.longitude]}
            eventHandlers={{
                click: () => {
                    document
                        .getElementById(`post-${post.id}-details`)
                        ?.scrollIntoView({
                            behavior: 'smooth',
                            block: isMobile ? 'end' : 'start',
                        });
                },
            }}
        />
    ));
};
