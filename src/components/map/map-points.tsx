import { Post } from '@/api/models/post';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createMarkerIcon } from './create-marker-icon';
import { getImageUrl } from '@/utils/getImageUrl';
import { MapPinIcon } from 'lucide-react';
import { formatPrice } from '../../lib/formatters';
import { useTranslation } from 'react-i18next';
import { CubeIcon } from '@radix-ui/react-icons';
import { ImageCarousel } from '../post-editor/components/image-carousel';

interface Props {
    posts: Post[];
}

export const MapPoints = ({ posts }: Props) => {
    const { t } = useTranslation();
    return (
        <MarkerClusterGroup>
            {posts.map((post) => (
                <Marker
                    key={post.id}
                    position={[post.latitude, post.longitude]}
                    eventHandlers={{
                        click: () => {
                            const card = document.getElementById(
                                `post-${post.id}`,
                            );

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
                    icon={createMarkerIcon()}
                >
                    <Popup>
                        <div className="flex flex-col gap-2">
                            <ImageCarousel
                                images={post.images}
                                title={post.title}
                                navCarousel={false}
                            />
                            <h1 className="font-semibold line-clamp-1 leading-tight px-2 text-base">
                                {post.title}
                            </h1>
                            <div className="flex items-center px-2">
                                <MapPinIcon />
                                <div className="line-clamp-1 px-2 text-base">
                                    {post.address}
                                </div>
                            </div>
                            <p className="!m-1 font-medium text-lg px-2">
                                {formatPrice(post.price, post.type, t)}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    );
};
0;
