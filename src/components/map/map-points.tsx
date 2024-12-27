import { Post } from '@/api/models/post';
import { Marker } from 'react-leaflet';

interface Props {
    posts: Post[];
}

export const MapPoints = ({ posts }: Props) => {
    return posts.map((post) => (
        <Marker
            key={post.id}
            position={[post.latitude, post.longitude]}
            eventHandlers={{
                click: () => {
                    const card = document.getElementById(`post-${post.id}`);

                    const button = document.getElementById(
                        `post-${post.id}-details`,
                    );

                    card?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });

                    button?.focus({
                        preventScroll: true,
                    });
                },
            }}
        />
    ));
};
