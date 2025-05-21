import { PostStatus } from '@/api/models/post';
import { useSetFavorite } from '@/api/posts/favorite/use-set-favorite';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUserContext } from '@/context/user-context';
import { capitalize } from '@/utils/capitalize';
import { HeartFilledIcon, HeartIcon, ResetIcon } from '@radix-ui/react-icons';
import { Link, useRouter } from '@tanstack/react-router';
import { ArrowLeft, BanIcon, Pencil, SaveIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useDeletePost } from '@/api/posts/use-delete-post';
import { useTranslation } from 'react-i18next';

interface Props<T extends FieldValues> {
    postId?: number | string;
    authorId?: number;
    isFavorite?: boolean;
    isEditing?: boolean;
    status?: PostStatus;
    control: Control<T>;
    isDirty?: boolean;
    isSaving?: boolean;
    reset?: () => void;
}

export const TopNav = <T extends FieldValues>({
    postId,
    authorId,
    isFavorite,
    isEditing,
    control,
    status,
    isDirty,
    isSaving,
    reset,
}: Props<T>) => {
    const { t } = useTranslation();
    const user = useUserContext();

    // Will not be called with postId === 0
    const { mutateAsync: mutateAsyncSetFavorite } = useSetFavorite({
        id: +(postId || 0),
    });
    // Will not be called with postId === 0
    const { mutateAsync: mutateAsyncDeletePost } = useDeletePost({
        id: +(postId || 0),
    });

    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { history, navigate } = useRouter();

    const isPostAuthor = user?.id === authorId;

    const isExistingPost = !!postId;

    return (
        <div className="flex justify-between px-4 pt-4 w-full">
            {isDirty ? (
                <Dialog open={leaveModalOpen} onOpenChange={setLeaveModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" type="button">
                            <ArrowLeft />
                            {t('Back')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {t('Do you want to leave?')}
                            </DialogTitle>
                            <DialogDescription>
                                {t('All unsaved changes will be lost.')}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    if (!postId) {
                                        history.back();
                                        return;
                                    }
                                    setLeaveModalOpen(false);
                                }}
                                type="button"
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setLeaveModalOpen(false);
                                    history.back();
                                }}
                                type="button"
                            >
                                {t('Leave')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : (
                <Button
                    variant="ghost"
                    onClick={() => history.back()}
                    type="button"
                >
                    <ArrowLeft />
                    {t('Back')}
                </Button>
            )}

            {(isPostAuthor || !isExistingPost) && isEditing && (
                <div className="gap-2 flex flex-wrap justify-end flex-reverse">
                    <FormField
                        control={control}
                        name={'type' as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-32">
                                            <SelectValue
                                                placeholder={t('Type')}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="RENTAL">
                                            {t('Rental')}
                                        </SelectItem>
                                        <SelectItem value="SALE">
                                            {t('Sale')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={'status' as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-32">
                                            <SelectValue
                                                placeholder={t('Status')}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">
                                            {t('Draft')}
                                        </SelectItem>
                                        <SelectItem value="PUBLISHED">
                                            {t('Published')}
                                        </SelectItem>
                                        <SelectItem value="ARCHIVED">
                                            {t('Archived')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={reset}
                                    type="button"
                                    size="icon"
                                >
                                    <ResetIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('Reset')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link
                                        to="/posts/$postId"
                                        params={{ postId: `${postId!}` }}
                                    >
                                        <BanIcon />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('Cancel')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {!!postId && (
                        <Dialog
                            open={deleteModalOpen}
                            onOpenChange={setDeleteModalOpen}
                        >
                            <DialogTrigger asChild>
                                <div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    type="button"
                                                    size="icon"
                                                    data-testid="delete-post-button"
                                                >
                                                    <Trash2Icon />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('Delete')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {t('Do you want to delete this post?')}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {/* TODO: Can be undone in future */}
                                        {t('This action cannot be undone.')}
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setDeleteModalOpen(false);
                                        }}
                                        type="button"
                                    >
                                        {t('Cancel')}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            mutateAsyncDeletePost();
                                            setDeleteModalOpen(false);
                                            navigate({
                                                to: '/my-posts',
                                            });
                                        }}
                                        type="button"
                                    >
                                        {t('Delete')}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon">
                                    <SaveIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('Save')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}

            {isPostAuthor && isExistingPost && !isEditing && (
                <div className="gap-2 flex items-center">
                    <div>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Badge variant={status!.toLowerCase() as any}>
                            {t(capitalize(status!))}
                        </Badge>
                    </div>
                    <Button variant="ghost" asChild isLoading={isSaving}>
                        <Link
                            to="/posts/$postId/edit"
                            params={{
                                postId: `${postId}`,
                            }}
                            replace
                        >
                            <Pencil />
                            {t('Edit')}
                        </Link>
                    </Button>
                </div>
            )}

            {!!user && !isPostAuthor && isExistingPost && (
                <Button
                    disabled={!user}
                    variant="ghost"
                    onClick={() =>
                        mutateAsyncSetFavorite({ favorite: !isFavorite })
                    }
                    type="button"
                >
                    {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
            )}
        </div>
    );
};
