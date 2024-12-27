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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../components/ui/form';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../components/ui/select';
import { useState } from 'react';
import { FetchError } from '@/api/helpers/fetch-error';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useEditUser } from '@/api/users/use-edit-user';

const STRINGS = {
    EDIT_USER: 'Edit user',
    EDIT_USER_DESCRIPTION:
        'You can edit user here. If you leave the password field empty, the password will not be changed.',
    PASSWORD: 'New password',
    CONFIRM_PASSWORD: 'Confirm password',
    TYPE: 'Type',
    ERROR: 'Error',
    USER: 'User',
    ADMIN: 'Admin',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    EMAIL: 'Email',
    PHONE: 'Phone number',
};

const formSchema = z.object({
    password: z
        .string({
            message: 'Password is required.',
        })
        .min(8, {
            message: 'Password must be at least 8 characters long.',
        })
        .max(32, {
            message: 'Password can be at most 32 characters long.',
        })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).+$/, {
            message: `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character from the following: #?!@$ %^&*-`,
        })
        .or(z.literal('')),
    type: z.enum(['ADMIN', 'USER'], {
        message: 'Type is required.',
    }),
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
});

interface Props {
    userId: number;
    userType: 'ADMIN' | 'USER';
    userEmail: string;
    userPhone: string;
    children: React.ReactNode;
}

type FormModel = z.infer<typeof formSchema>;

export const EditUserDialog = ({
    children,
    userId,
    userType,
    userEmail,
    userPhone,
}: Props) => {
    const { mutateAsync: editUserMutateAsync } = useEditUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            type: userType,
            email: userEmail,
            phone: userPhone,
        },
    });

    const onSubmit = async (data: FormModel) => {
        setError(null);
        setLoading(true);
        try {
            await editUserMutateAsync({ ...data, userId });
            setOpen(false);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(STRINGS.INTERNAL_SERVER_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{STRINGS.EDIT_USER}</DialogTitle>
                    <DialogDescription>
                        {STRINGS.EDIT_USER_DESCRIPTION}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {error && (
                            <Alert variant="destructive">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertTitle>{STRINGS.ERROR}</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{STRINGS.PASSWORD}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={STRINGS.PASSWORD}
                                            {...field}
                                            type="password"
                                            autoComplete="new-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{STRINGS.EMAIL}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={STRINGS.EMAIL}
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
                                    <FormLabel>{STRINGS.PHONE}</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{STRINGS.TYPE}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        autoComplete="off"
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="USER">
                                                    {STRINGS.USER}
                                                </SelectItem>
                                                <SelectItem value="ADMIN">
                                                    {STRINGS.ADMIN}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" isLoading={loading}>
                                {STRINGS.EDIT_USER}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
