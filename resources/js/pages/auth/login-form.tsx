import { Button } from '@/components/button';
import { PasswordInput } from '@/components/password-input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { handleServerError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { LoginData, loginFormSchema } from './types';

export default function LoginForm() {
    const form = useForm<LoginData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: 'test@example.com',
            password: 'password1234',
            remember: false,
        },
    });

    const onSubmit = async (data: LoginData): Promise<void> => {
        await new Promise<void>((res) => {
            router.post(route('login'), data, {
                onError: (error) => {
                    if (typeof error === 'object' && 'message' in error) {
                        toast({
                            variant: 'destructive',
                            title: 'Failed to login!',
                            description: error.message,
                        });
                    } else {
                        handleServerError(error);
                    }
                },
                onFinish: () => {
                    form.reset({ password: '' });
                    res();
                },
            });
        });
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="serviceninja@nkrcja.com"
                                            {...field}
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
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-2" loading={isLoading}>
                            Login
                        </Button>

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
                                onClick={() => toast({ title: 'Coming soon!' })}
                                variant="outline"
                                className="w-full"
                                type="button"
                                loading={isLoading}
                                leftSection={
                                    <IconBrandGoogleFilled className="h-4 w-4" />
                                }
                            >
                                Google
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
