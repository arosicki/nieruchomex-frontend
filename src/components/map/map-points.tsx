import { Post } from '@/api/models/post';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createMarkerIcon } from './create-marker-icon';
import { MapPinIcon, Receipt } from 'lucide-react';
import { formatPrice } from '../../lib/formatters';
import { useTranslation } from 'react-i18next';
import { ImageCarousel } from '../post-editor/components/image-carousel';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

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
                        <div className="flex flex-col gap-2 min-w-48">
                            <ImageCarousel
                                images={post.images}
                                title={post.title}
                                navCarousel={false}
                            />
                            <h1 className="font-semibold line-clamp-2 leading-tight px-3 text-base mb-1">
                                {post.title}
                            </h1>
                            <div className="flex items-center px-3 gap-2">
                                <MapPinIcon className="size-4" />
                                <div className="line-clamp-1 text-sm">
                                    {post.address}
                                </div>
                            </div>
                            <div className="flex items-center px-3 mb-2 gap-2">
                                <Receipt className="size-4" />
                                <div className="line-clamp-1 text-sm">
                                    {formatPrice(post.price, post.type, t)}
                                </div>
                            </div>
                            <div className="flex w-full justify-end mb-3 px-3">
                                <Button
                                    id={`post-${post.id}-details`}
                                    asChild
                                    className="!text-primary-foreground font-medium"
                                >
                                    <Link
                                        to="/posts/$postId"
                                        params={{
                                            postId: `${post.id}`,
                                        }}
                                    >
                                        {t('View details')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    );
};
0;
