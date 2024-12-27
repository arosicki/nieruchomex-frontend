import { Post } from '@/api/models/post';
import { AtSignIcon, PhoneIcon } from 'lucide-react';

import { RichtextEditor } from '../richtext-editor/richtext-editor';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/utils/getInitials';
import { capitalize } from '../../utils/capitalize';
import { TopNav } from './components/top-nav';
import { Header } from './components/header';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '../ui/form';
import { ImageCarousel } from './components/image-carousel';
import { ImageInput } from './components/image-input';
import { Details } from './components/details';
import { useUserContext } from '@/context/user-context';
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

interface EditProps {
    post?: Post;
    disabled?: false;
}

type Props = ViewProps | EditProps;

const STRINGS = {
    EMAIL: 'Email',
    PHONE: 'Phone number',
    SELLER: 'Seller',
    LOCATION: 'Location',
    ARCHIVED_TITLE: 'This offer is archived',
    ARCHIVED_DESCRIPTION: 'It is no longer available.',
};

export const PostEditor = ({ post, disabled }: Props) => {
    const form = useForm<PostFormFields>({
        defaultValues: createDefaultValues(post),
        resolver: zodResolver(postFormSchema),
    });
    const user = useUserContext();
    const navigate = useNavigate();
    const editor = useEditorRef('richtext-editor');

    const { mutateAsync: mutateAsyncEditPost, isPending: isPendingEditPost } =
        useEditPost({ id: +(post?.id || 0) });

    const { mutateAsync: mutateAsyncAddPost, isPending: isPendingAddPost } =
        useAddPost();

    useEffect(() => {
        if (disabled || !form.formState.isDirty) return;

        window.onbeforeunload = () => true;

        return () => {
            window.onbeforeunload = null;
        };
    }, [disabled, form.formState.isDirty]);

    const onSubmit = async (data: PostFormFields) => {
        if (disabled) return;

        const { removeImages, ...rest } = data;

        if (post?.id) {
            await mutateAsyncEditPost({
                ...rest,
                removeImages,
            });

            return navigate({
                to: `/posts/$postId`,
                params: { postId: `${post.id}` },
                replace: true,
            });
        }

        const newPost = await mutateAsyncAddPost(rest);

        return navigate({
            to: `/posts/$postId`,
            params: { postId: `${newPost.data.id}` },
            replace: true,
        });
    };

    const author = post?.author ?? user!;

    const isPending = isPendingEditPost || isPendingAddPost;

    const lat = disabled ? post.latitude : form.watch('latitude');
    const lng = disabled ? post.longitude : form.watch('longitude');

    const mapCenter: [number, number] = [lat, lng];

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
                            </div>
                        </div>

                        <div className="border rounded-xl p-4 flex flex-col gap-4">
                            <h2 className="text-xl">{STRINGS.LOCATION}</h2>
                            <div className="h-96 w-full">
                                {disabled ? (
                                    <Map center={mapCenter}>
                                        <Marker position={mapCenter} />
                                    </Map>
                                ) : (
                                    <LocationSelector
                                        center={mapCenter}
                                        onChange={(lat, lng) => {
                                            form.setValue('latitude', lat);
                                            form.setValue('longitude', lng);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};
