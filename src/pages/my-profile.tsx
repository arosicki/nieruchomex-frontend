import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useEditUser } from '@/api/users/use-edit-user';
import { FetchError } from '@/api/helpers/fetch-error';
import { getErrorText } from '@/api/helpers/get-error-text';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/utils/getInitials';
import { capitalize } from '@/utils/capitalize';

const STRINGS = {
    NO_PERMISSION: 'You do not have permission to view this page.',
    MY_PROFILE: 'My profile',
    NEW_PASSWORD: 'New password',
    ERROR: 'Error',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    EMAIL: 'Email',
    PHONE: 'Phone number',
    SAVE: 'Save',
    RESET: 'Reset',
    WILL_NOT_CHANGE:
        'If you leave the password field empty, the password will not be changed.',
};

const formSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email({
            message: 'Email must be a valid email address.',
        }),
    phone: z
        .string({
            required_error: 'Phone number is required.',
        })
        .regex(/^[+]?[0-9]{0,3}[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
            message: 'Phone number must be a valid phone number.',
        }),
    password: z.string().optional(),
});

type FormModel = z.infer<typeof formSchema>;

export const MyProfilePage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { mutateAsync: editUserMutateAsync } = useEditUser();

    const user = useUserContext();
    const form = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user?.email,
            phone: user?.phone,
        },
    });

    if (!user)
        throw new Response(STRINGS.NO_PERMISSION, {
            status: 403,
            statusText: STRINGS.NO_PERMISSION,
        });

    const onSubmit = async (data: FormModel) => {
        setError(null);
        setLoading(true);
        try {
            await editUserMutateAsync({
                ...data,
                userId: user.id,
                type: user.type,
            });
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(STRINGS.INTERNAL_SERVER_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <WallLayout>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center w-full py-8 gap-8 container">
                    <h1 className="text-3xl font-bold w-full">
                        {STRINGS.MY_PROFILE}
                    </h1>

                    <div className="flex flex-col container border p-4 rounded-xl">
                        <Form {...form}>
                            <div className="flex flex-col w-full gap-4 items-center p-8 xl:p-0">
                                <Avatar className="size-32">
                                    {/* TODO: Stretch add user avatars */}
                                    {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                                    <AvatarFallback className="text-4xl">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-center">
                                    <h3 className="text-lg">
                                        {capitalize(user.name)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {capitalize(user.type)}
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {error && (
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>{STRINGS.ERROR}</AlertTitle>
                                        <AlertDescription>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {STRINGS.NEW_PASSWORD}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        STRINGS.NEW_PASSWORD
                                                    }
                                                    {...field}
                                                    type="password"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {STRINGS.WILL_NOT_CHANGE}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {STRINGS.EMAIL}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        STRINGS.NEW_PASSWORD
                                                    }
                                                    {...field}
                                                    type="email"
                                                    autoComplete="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {STRINGS.PHONE}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={STRINGS.PHONE}
                                                    {...field}
                                                    type="tel"
                                                    autoComplete="tel"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => form.reset()}
                                    >
                                        {STRINGS.RESET}
                                    </Button>
                                    <Button type="submit" isLoading={loading}>
                                        {STRINGS.SAVE}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </WallLayout>
    );
};
