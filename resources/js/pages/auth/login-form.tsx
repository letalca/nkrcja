import { Button } from '@/components/button';
import { PasswordInput } from '@/components/password-input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/useToast';
import { handleServerError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginData, loginFormSchema } from './types';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export default function LoginForm({
    email,
    password,
    canSignInWithGoogle,
}: {
    email?: string;
    password?: string;
    canSignInWithGoogle: boolean;
}) {
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

    const { setFocus, ...form } = useForm<LoginData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: email ?? '',
            password: password ?? '',
            remember: false,
        },
    });

    useEffect(() => {
        // Auto-focus email input on mount
        setFocus('email');
    }, [setFocus]);

    const handleLoginError = (error: unknown) => {
        setLoginAttempts((prev) => prev + 1);

        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            setIsLockedOut(true);
            setTimeout(() => {
                setIsLockedOut(false);
                setLoginAttempts(0);
            }, LOCKOUT_DURATION);

            toast({
                variant: 'destructive',
                title: 'Account Locked',
                description:
                    'Too many failed attempts. Please try again in 15 minutes.',
            });
            return;
        }

        if (typeof error === 'object' && error && 'message' in error) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: error.message as string,
            });
        } else {
            handleServerError(error);
        }
    };

    const onSubmit = async (data: LoginData): Promise<void> => {
        if (isLockedOut) {
            toast({
                variant: 'destructive',
                title: 'Account Locked',
                description: 'Please wait before trying again.',
            });
            return;
        }

        await new Promise<void>((res) => {
            router.post(route('login'), data, {
                onError: handleLoginError,
                onFinish: () => {
                    form.reset({ password: '' });
                    setLoginAttempts(0);
                    res();
                },
            });
        });
    };

    const handleGoogleLogin = async () => {
        setGoogleAuthLoading(true);
        try {
            // Implement Google login logic here
            toast({ title: 'Coming soon!' });
        } finally {
            setGoogleAuthLoading(false);
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="grid gap-6">
            <Form {...form} setFocus={setFocus}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    aria-label="Login form"
                >
                    <div className="grid gap-2">
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="serviceninja@nkrcja.com"
                                            aria-label="Email address"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage role="alert" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        {route().has('password.request') ? (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-primary hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        ) : null}
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            id="password"
                                            placeholder="********"
                                            aria-label="Password"
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage role="alert" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        Remember me
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                        <Button
                            className="mt-2"
                            loading={isLoading}
                            disabled={isLockedOut || googleAuthLoading}
                            aria-disabled={isLockedOut}
                        >
                            Login
                        </Button>
                        {canSignInWithGoogle && (
                            <>
                                <div className="relative my-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={handleGoogleLogin}
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        loading={googleAuthLoading}
                                        disabled={isLockedOut || isLoading}
                                        aria-disabled={isLockedOut}
                                        leftSection={
                                            <IconBrandGoogleFilled className="h-4 w-4" />
                                        }
                                    >
                                        Google
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
