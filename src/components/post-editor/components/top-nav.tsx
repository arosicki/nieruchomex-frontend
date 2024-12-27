import { PostStatus } from '@/api/models/post';
import { useSetFavorite } from '@/api/posts/favorite/use-set-favorite';
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
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Link, useRouter } from '@tanstack/react-router';
import { ArrowLeft, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

const STRINGS = {
    BACK: 'Back',
    EDIT: 'Edit',
    SAVE: 'Save',
    ADD_TO_FAVORITES: 'Add to favorites',
    REMOVE_FROM_FAVORITES: 'Remove from favorites',
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
    ARCHIVED: 'Archived',
    STATUS: 'Status',
    RENTAL: 'Rental',
    SALE: 'Sale',
    TYPE: 'Type',
    DO_YOU_WANT_TO_LEAVE: 'Do you want to leave?',
    UNSAVED_CHANGES: 'All unsaved changes will be lost.',
    CANCEL: 'Cancel',
    LEAVE: 'Leave',
};

interface Props<T extends FieldValues> {
    postId?: number | string;
    authorId?: number;
    isFavorite?: boolean;
    isEditing?: boolean;
    status?: PostStatus;
    control: Control<T>;
    isDirty?: boolean;
    isSaving?: boolean;
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
}: Props<T>) => {
    const user = useUserContext();
    // Will not be called with postId === 0
    const { mutateAsync: mutateAsyncSetFavorite } = useSetFavorite({
        id: +(postId || 0),
    });
    // Will not be called with postId === 0

    const [open, setOpen] = useState(false);

    const { history } = useRouter();

    const isPostAuthor = user?.id === authorId;

    const isExistingPost = !!postId;

    return (
        <div className="flex justify-between px-4 pt-4 w-full">
            {isDirty ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost">
                            <ArrowLeft />
                            {STRINGS.BACK}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {STRINGS.DO_YOU_WANT_TO_LEAVE}
                            </DialogTitle>
                            <DialogDescription>
                                {STRINGS.UNSAVED_CHANGES}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                {STRINGS.CANCEL}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setOpen(false);
                                    history.back();
                                }}
                            >
                                {STRINGS.LEAVE}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : (
                <Button variant="ghost" onClick={() => history.back()}>
                    <ArrowLeft />
                    {STRINGS.BACK}
                </Button>
            )}

            {(isPostAuthor || !isExistingPost) && isEditing && (
                <div className="gap-2 flex">
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
                                                placeholder={STRINGS.TYPE}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="RENTAL">
                                            {STRINGS.RENTAL}
                                        </SelectItem>
                                        <SelectItem value="SALE">
                                            {STRINGS.SALE}
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
                                                placeholder={STRINGS.STATUS}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">
                                            {STRINGS.DRAFT}
                                        </SelectItem>
                                        <SelectItem value="PUBLISHED">
                                            {STRINGS.PUBLISHED}
                                        </SelectItem>
                                        <SelectItem value="ARCHIVED">
                                            {STRINGS.ARCHIVED}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button isLoading={isSaving}>
                        <Save />
                        {STRINGS.SAVE}
                    </Button>
                </div>
            )}

            {isPostAuthor && isExistingPost && !isEditing && (
                <div className="gap-2 flex items-center">
                    <div>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Badge variant={status!.toLowerCase() as any}>
                            {capitalize(status!)}
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
                            {STRINGS.EDIT}
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
                >
                    {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
                    {isFavorite
                        ? STRINGS.REMOVE_FROM_FAVORITES
                        : STRINGS.ADD_TO_FAVORITES}
                </Button>
            )}
        </div>
    );
};
