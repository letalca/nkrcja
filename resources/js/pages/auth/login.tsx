import NkrcCommunityLogo from '@/assets/nkrc-community-logo.png';
import NkrcLogoWhite from '@/assets/nkrc-logo-white.png';
import BaseLayout from '@/layouts/base-layout';
import { PageProps } from '@/types';
import LoginForm from './login-form';

export default function Login({
    email,
    password,
    canSignInWithGoogle,
}: PageProps<{
    email?: string;
    password?: string;
    canSignInWithGoogle: boolean;
}>) {
    return (
        <BaseLayout>
            <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img
                            src={NkrcLogoWhite}
                            className="mr-2 w-28"
                            width={301}
                            height={60}
                            alt="NKRC Logo (white)"
                        />
                        Admin
                    </div>

                    <img
                        src={NkrcCommunityLogo}
                        className="relative m-auto"
                        width={301}
                        height={60}
                        alt="NKRC Community Logo (orange)"
                    />
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below <br />
                                to log into your account
                            </p>
                        </div>
                        <LoginForm
                            email={email}
                            password={password}
                            canSignInWithGoogle={canSignInWithGoogle}
                        />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
