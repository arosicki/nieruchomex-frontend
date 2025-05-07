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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { FetchError } from '@/api/helpers/fetch-error';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useDeleteUser } from '@/api/users/use-delete-user';
import { useTranslation } from 'react-i18next';

interface Props {
    userId: number;
    children: React.ReactNode;
}

export const DeleteUserDialog = ({ children, userId }: Props) => {
    const { t } = useTranslation();
    const { mutateAsync: deleteUserMutateAsync } = useDeleteUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            await deleteUserMutateAsync({ userId });
            setOpen(false);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else
                setError(
                    t('An unknown error occurred. Please try again later'),
                );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('Delete user')}</DialogTitle>
                    <DialogDescription>
                        {t(
                            'User will be permanently deleted. This action cannot be undone.',
                        )}
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>{t('Error')}</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button
                        type="button"
                        disabled={loading}
                        variant="secondary"
                        onClick={() => setOpen(false)}
                    >
                        {t('Cancel')}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onSubmit}
                        isLoading={loading}
                    >
                        {t('Delete user')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
