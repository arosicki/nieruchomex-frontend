import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';
import { CameraIcon } from '@radix-ui/react-icons';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../ui/carousel';
import { getImageUrl } from '@/utils/getImageUrl';
import { useEffect, useState } from 'react';
import { Image } from '@/api/models/image';
import { STRINGS } from '@/strings';
import { ImageOff } from 'lucide-react';

interface Props {
    images: Image[];
    title: string;
}

export const ImageCarousel = ({ images, title }: Props) => {
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [bigCarouselApi, setBigCarouselApi] = useState<CarouselApi | null>(
        null,
    );
    const [smallCarouselApi, setSmallCarouselApi] =
        useState<CarouselApi | null>(null);

    useEffect(() => {
        if (!bigCarouselApi) return;

        setCount(images.length);
        setCurrent(bigCarouselApi.selectedScrollSnap() + 1);

        bigCarouselApi.on('select', () => {
            setCurrent(bigCarouselApi.selectedScrollSnap() + 1);
        });
    }, [bigCarouselApi, images.length]);

    useEffect(() => {
        if (!smallCarouselApi) return;

        smallCarouselApi.scrollTo(current - 1);
    }, [current, smallCarouselApi]);

    if (images.length === 0)
        return (
            <div className="flex h-full w-full items-center justify-center border rounded-lg mb-2 aspect-[4/3]">
                <ImageOff className="h-12 w-full text-muted-foreground" />
            </div>
        );

    return (
        <>
            <Carousel setApi={setBigCarouselApi} className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <img
                                className="h-full object-cover rounded-lg min-w-full aspect-[4/3]"
                                src={getImageUrl(image.url)}
                                alt={title}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
                <Badge
                    variant="secondary"
                    className="absolute bottom-4 right-4 flex gap-2"
                >
                    <CameraIcon />
                    {current} {STRINGS.OF} {count}
                </Badge>
            </Carousel>
            <Carousel className="w-full mb-2" setApi={setSmallCarouselApi}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-1/4 xl:basis-1/5"
                            onClick={() => bigCarouselApi?.scrollTo(index)}
                        >
                            <img
                                className={cn(
                                    'h-full object-cover border-2 rounded-md',
                                    index === current - 1
                                        ? 'border-primary'
                                        : 'border-transparent',
                                )}
                                src={getImageUrl(image.url)}
                                alt={title}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    );
};
