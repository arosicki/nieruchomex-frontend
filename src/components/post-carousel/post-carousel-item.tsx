import { Post } from '@/api/models/post';
import { CarouselItem } from '../ui/carousel';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { getImageUrl } from '@/utils/getImageUrl';
import { ImageOff, MapPinIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/user-context';
import { useSetFavorite } from '@/api/posts/favorite/use-set-favorite';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Badge } from '../ui/badge';
import { capitalize } from '@/utils/capitalize';
import { Link } from '@tanstack/react-router';
import { formatPrice } from '@/lib/formatters';
import { useTranslation } from 'react-i18next';

interface Props {
    post: Post;
    displayMode?: 'status' | 'favorite';
}

export const PostCarouselItem = ({
    post: { id, images, title, isFavorite, price, type, address, status },
    displayMode = 'favorite',
}: Props) => {
    const { t } = useTranslation();
    const user = useUserContext();
    const { mutateAsync: setFavoriteMutateAsync } = useSetFavorite({ id });

    return (
        <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 relative">
            <Card>
                {images[0]?.url ? (
                    <img
                        className="h-full object-cover rounded-t-md  aspect-[4/3]"
                        src={getImageUrl(images[0]?.url)}
                        alt={title}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center border-b aspect-[4/3]">
                        <ImageOff className="h-12 w-full text-muted-foreground" />
                    </div>
                )}

                {displayMode === 'status' && (
                    <div className="bg-background/50 max-h-6 absolute top-2 right-2 flex rounded-md">
                        <Badge
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            variant={status.toLowerCase() as any}
                        >
                            {capitalize(status)}
                        </Badge>
                    </div>
                )}

                <CardHeader className="pb-4">
                    <CardTitle className="justify-between flex w-full">
                        <div className="text-2xl font-semibold tracking-tight truncate">
                            {formatPrice(price, type, t)}
                        </div>
                        {displayMode === 'favorite' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="[&_svg]:size-5"
                                disabled={!user}
                                onClick={() =>
                                    setFavoriteMutateAsync({
                                        favorite: !isFavorite,
                                    })
                                }
                            >
                                {isFavorite ? (
                                    <HeartFilledIcon />
                                ) : (
                                    <HeartIcon />
                                )}
                            </Button>
                        )}
                    </CardTitle>
                    <CardDescription className="text-foreground font-medium tracking-tight truncate">
                        {title}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2 pt-2 truncate">
                        <MapPinIcon className="min-w-4" />
                        {address}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex w-full justify-end">
                    <Button asChild>
                        <Link
                            to="/posts/$postId"
                            params={{
                                postId: `${id}`,
                            }}
                        >
                            {t('View details')}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </CarouselItem>
    );
};
