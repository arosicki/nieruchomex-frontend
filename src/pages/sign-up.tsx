import { FetchError } from '@/api/helpers/fetch-error';
import { Logo } from '@/components/logo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserContext } from '@/context/user-context';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ThemeToggle } from '@/components/theme-toggle';

const STRINGS = {
    ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
    SIGN_IN: 'Sign in',
    CREATE_AN_ACCOUNT: 'Create an account',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm password',
    SUBMIT: 'Sign up',
    ERROR: 'Error',
    PHONE: 'Phone number',
    EMAIL: 'Email',
};

const formSchema = z
    .object({
        username: z
            .string({
                message: 'Username is required.',
            })
            .min(3, {
                message: 'Username must be at least 3 characters long.',
            })
            .max(32, {
                message: 'Username can be at most 32 characters long.',
            })
            .regex(/^[a-zA-Z0-9_]+$/, {
                message:
                    'Username can only contain letters, numbers, and underscores.',
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
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).+$/,
                {
                    message: `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character from the following: #?!@$ %^&*-`,
                },
            ),
        confirmPassword: z.string({
            message: 'Confirm password is required.',
        }),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords must match',
            path: ['confirmPassword'],
        },
    );

type FormModel = z.infer<typeof formSchema>;

export const SignUpPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const { signUp } = useAuth();
    const user = useUserContext();
    const navigate = useNavigate();

    const form = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (user) {
            navigate({
                to: '/',
            });
        }
    }, [navigate, user]);

    const onSubmit = async (data: FormModel) => {
        setIsPending(true);
        setError(null);

        try {
            await signUp(data);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(STRINGS.INTERNAL_SERVER_ERROR);
        } finally {
            setIsPending(false);
        }
    };

    // User will be redirected
    if (user) return null;

    return (
        <div className="grid grid-cols-1 h-screen w-screen lg:grid-cols-2 justify-center place-items-center lg:place-items-stretch">
            <div className="bg-muted relative hidden lg:block">
                <div className="relative z-20 flex items-center py-4 px-12">
                    <Logo />
                </div>
            </div>

            <div className="container">
                <div className="absolute z-20 flex items-center py-4 px-12 lg:hidden top-0 left-0">
                    <Logo />
                </div>
                <div className="mx-auto flex w-full flex-col justify-center h-full space-y-6 p-12 sm:w-96">
                    <div className="absolute top-6 right-6">
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {STRINGS.CREATE_AN_ACCOUNT}
                        </h1>
                    </div>
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
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder={STRINGS.USERNAME}
                                                {...field}
                                                autoComplete="username"
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
                                        <FormControl>
                                            <Input
                                                placeholder={STRINGS.EMAIL}
                                                {...field}
                                                autoComplete="username"
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
                                        <FormControl>
                                            <Input
                                                placeholder={STRINGS.PHONE}
                                                {...field}
                                                autoComplete="username"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    STRINGS.CONFIRM_PASSWORD
                                                }
                                                {...field}
                                                type="password"
                                                autoComplete="new-password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                isLoading={isPending}
                            >
                                {STRINGS.SUBMIT}
                            </Button>
                        </form>
                    </Form>
                    <Button variant="link" asChild>
                        <Link to="/sign-in">
                            {STRINGS.ALREADY_HAVE_AN_ACCOUNT}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
