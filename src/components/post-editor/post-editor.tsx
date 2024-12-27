import { Post } from '@/api/models/post';
import { Button } from '../ui/button';
import {
    ArrowLeft,
    BoxIcon,
    HeartIcon,
    LandPlotIcon,
    MapPinIcon,
} from 'lucide-react';
import { CameraIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useUserContext } from '@/context/user-context';
<<<<<<< HEAD
import { createDefaultValues } from './form/create-default-values';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostFormFields, postFormSchema } from './form/schema';
import { useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAddPost } from '@/api/posts/use-add-post';
import { useEditPost } from '@/api/posts/use-edit-post';
import { Map } from '../map/map';
import { Marker } from 'react-leaflet';
import { LocationSelector } from '../location-selector/location-selector';
import { useEditorRef } from '@udecode/plate-common/react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ViewProps {
    post: Post;
    disabled: true;
}
=======
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { getImageUrl } from '@/utils/getImageUrl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { formatPrice, formatPricePerMeter } from '@/lib/formatters';
import { RichtextEditor } from '../richtext-editor/richtext-editor';
>>>>>>> parent of c5f64a8 (Almost done)

interface Props {
    post?: Post;
    disabled?: boolean;
}

const STRINGS = {
<<<<<<< HEAD
    EMAIL: 'Email',
    PHONE: 'Phone number',
    SELLER: 'Seller',
    LOCATION: 'Location',
    ARCHIVED_TITLE: 'This offer is archived',
    ARCHIVED_DESCRIPTION: 'It is no longer available.',
=======
    BACK: 'Back',
    ADD_TO_FAVORITES: 'Add to favorites',
    REMOVE_FROM_FAVORITES: 'Remove from favorites',
    OF: 'of',
    PER_MONTH: 'per month',
    ADDRESS: 'Address',
    AREA: 'Area',
    ROOMS: 'Rooms',
    METERS_SQUARED: 'm²',
>>>>>>> parent of c5f64a8 (Almost done)
};

export const PostEditor = ({ post, disabled }: Props) => {
    const user = useUserContext();
<<<<<<< HEAD
    const navigate = useNavigate();
    const editor = useEditorRef('richtext-editor');

    const { mutateAsync: mutateAsyncEditPost, isPending: isPendingEditPost } =
        useEditPost({ id: +(post?.id || 0) });

    const { mutateAsync: mutateAsyncAddPost, isPending: isPendingAddPost } =
        useAddPost();
=======
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [bigCarouselApi, setBigCarouselApi] = useState<CarouselApi | null>(
        null,
    );
    const [smallCarouselApi, setSmallCarouselApi] =
        useState<CarouselApi | null>(null);
>>>>>>> parent of c5f64a8 (Almost done)

    useEffect(() => {
        if (!bigCarouselApi) return;

        setCount(bigCarouselApi.scrollSnapList().length);
        setCurrent(bigCarouselApi.selectedScrollSnap() + 1);

        bigCarouselApi.on('select', () => {
            setCurrent(bigCarouselApi.selectedScrollSnap() + 1);
        });
    }, [bigCarouselApi]);

    useEffect(() => {
        if (!smallCarouselApi) return;

<<<<<<< HEAD
    const parsedDescription = useMemo(() => {
        if (!post?.description) return;

        return JSON.parse(post.description);
    }, [post?.description]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center"
            >
                <TopNav
                    isEditing={!disabled}
                    postId={post?.id}
                    authorId={post?.author.id}
                    isFavorite={!!post?.isFavorite}
                    status={post?.status}
                    control={form.control}
                    isDirty={!disabled || form.formState.isDirty}
                    isSaving={isPending}
                    reset={() => {
                        form.reset();
                        if (!editor.isFallback)
                            editor.tf.setValue(parsedDescription);
                    }}
                />

                {post?.status === 'ARCHIVED' && disabled && (
                    <div className="px-4 pt-4 w-full">
                        <Alert>
                            <ExclamationTriangleIcon />
                            <AlertTitle> {STRINGS.ARCHIVED_TITLE}</AlertTitle>
                            <AlertDescription>
                                {STRINGS.ARCHIVED_DESCRIPTION}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                <div className="container flex justify-center flex-col xl:gap-4 xl:flex-row">
                    <div className="p-4 xl:w-2/3 gap-4 flex flex-col">
                        <div className="border rounded-xl py-2 px-4 flex flex-col gap-4">
                            <Header
                                area={post?.area}
                                price={post?.price}
                                title={post?.title}
                                type={post?.type}
                                control={form.control}
                                // Typescript dumb
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                isEditing={!disabled as any}
                            />
                            {disabled && post ? (
                                <ImageCarousel
                                    images={post.images}
                                    title={post.title}
                                />
                            ) : (
                                <ImageInput
                                    images={post?.images ?? []}
                                    control={form.control}
                                    setValue={form.setValue}
                                />
                            )}
                        </div>

                        <Details
                            control={form.control}
                            address={post?.address}
                            area={post?.area}
                            rooms={post?.rooms}
                            createdAt={post?.createdAt}
                            updatedAt={post?.updatedAt}
                            // Typescript dumb
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            isEditing={!disabled as any}
                        />

                        {(!disabled || parsedDescription?.length > 1) && (
                            <div className="border rounded-xl">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <RichtextEditor
                                                readOnly={disabled}
                                                value={field.value}
                                                onChange={({ value }) =>
                                                    field.onChange(value)
                                                }
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <div className="container flex flex-col-reverse gap-4 px-4 pb-8 xl:flex-col xl:w-1/3 lg:pt-4">
                        <div className="border rounded-xl p-4 ">
                            <h2 className="text-xl">{STRINGS.SELLER}</h2>
                            <div className="flex flex-col sm:flex-row xl:flex-col justify-center gap-4 items-center">
                                <div className="flex flex-col w-full gap-4 items-center p-8 xl:p-0">
                                    <Avatar className="size-32">
                                        {/* TODO: Stretch add user avatars */}
                                        {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                                        <AvatarFallback className="text-4xl">
                                            {getInitials(author.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg">
                                        {capitalize(author.name)}
                                    </h3>
                                </div>
                                <dl className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-1 w-full">
                                    <dt className="flex gap-2 text-md font-medium items-center">
                                        <AtSignIcon size={20} />
                                        {STRINGS.EMAIL}
                                    </dt>
                                    <dd>{author?.email}</dd>
                                    <dt className="flex gap-2 text-md font-medium items-center pt-4 lg:pt-0">
                                        <PhoneIcon size={20} />
                                        {STRINGS.PHONE}
                                    </dt>
                                    <dd>{author?.phone}</dd>
                                </dl>
=======
        smallCarouselApi.scrollTo(current - 1);
    }, [current, smallCarouselApi]);

    return (
        <div>
            <div className="flex justify-between px-4 pt-4">
                <Button variant="ghost">
                    <ArrowLeft />
                    {STRINGS.BACK}
                </Button>

                <Button disabled={!user} variant="ghost">
                    {post?.isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
                    {post?.isFavorite
                        ? STRINGS.REMOVE_FROM_FAVORITES
                        : STRINGS.ADD_TO_FAVORITES}
                </Button>
            </div>
            <div className="w-full flex justify-center">
                <div className="container p-4 w-2/3 gap-4 flex flex-col">
                    <div className="border rounded-xl py-2 px-4 flex flex-col gap-4">
                        <div className="py-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold">
                                    {formatPrice(post!.price, post!.type)}
                                </h1>
                                <p className="text-md">
                                    {formatPricePerMeter(
                                        post!.price,
                                        post!.area,
                                    )}
                                </p>
>>>>>>> parent of c5f64a8 (Almost done)
                            </div>
                            <p className="text-md">{post?.title}</p>
                        </div>
                        <div>
                            <Carousel
                                setApi={setBigCarouselApi}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {post?.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                className="h-full object-cover rounded-lg"
                                                src={getImageUrl(image.url)}
                                                alt={post.title}
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
                        </div>
                        <Carousel
                            className="w-full mb-2"
                            setApi={setSmallCarouselApi}
                        >
                            <CarouselContent>
                                {post?.images.map((image, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-1/2 md:basis-1/4 xl:basis-1/5"
                                        onClick={() =>
                                            bigCarouselApi?.scrollTo(index)
                                        }
                                    >
                                        <img
                                            className={cn(
                                                'h-full object-cover border-2 rounded-md',
                                                index === current - 1
                                                    ? 'border-primary'
                                                    : 'border-transparent',
                                            )}
                                            src={getImageUrl(image.url)}
                                            alt={post.title}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <dl className="border rounded-xl grid grid-cols-2 p-4 gap-1">
                        <dt className="flex gap-2 text-md font-medium items-center">
                            <MapPinIcon size={20} />
                            {STRINGS.ADDRESS}
                        </dt>
                        <dd>{post?.address}</dd>
                        <dt className="flex gap-2 text-md font-medium items-center">
                            <LandPlotIcon size={20} />
                            {STRINGS.AREA}
                        </dt>
                        <dd>
                            {post?.area} {STRINGS.METERS_SQUARED}
                        </dd>
                        <dt className="flex gap-2 font-medium text-md items-center">
                            <BoxIcon size={20} />
                            {STRINGS.ROOMS}
                        </dt>
                        <dd>{post?.rooms}</dd>
                    </dl>
                    <div className="border rounded-xl">
                        <RichtextEditor />
                    </div>
                </div>
                <div className="container p-4 w-1/3"></div>
            </div>
        </div>
    );
};
