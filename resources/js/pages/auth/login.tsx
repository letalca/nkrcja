import NkrcCommunityLogo from '@/assets/nkrc-community-logo.png';
import NkrcLogoWhite from '@/assets/nkrc-logo-white.png';
import { useAutoFocusFieldOnKeyPress } from '@/hooks/use-autofocus-field-on-key-press';
import BaseLayout from '@/layouts/base-layout';
import { PageProps } from '@/types';
import { motion } from 'framer-motion';
import LoginForm from './login-form';

type LoginPageProps = PageProps<{
    email?: string;
    password?: string;
    canSignInWithGoogle: boolean;
}>;

export default function Login({
    email,
    password,
    canSignInWithGoogle,
    config,
}: LoginPageProps) {
    useAutoFocusFieldOnKeyPress('input[type="email"]');

    return (
        <BaseLayout>
            <main className="container relative min-h-svh w-full lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* Left Panel - Branding */}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-20 flex items-center text-lg font-medium"
                    >
                        <img
                            src={NkrcLogoWhite}
                            className="mr-2 w-28 transition-transform hover:scale-105"
                            width={301}
                            height={60}
                            alt="NKRC Logo"
                            loading="eager"
                        />
                        <span className="ml-2 border-l border-white/20 pl-2">
                            Admin Portal
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-20 m-auto flex flex-col items-center"
                    >
                        <img
                            src={NkrcCommunityLogo}
                            className="w-full max-w-md transition-transform hover:scale-105"
                            width={301}
                            height={60}
                            alt="NKRC Community Logo"
                            loading="eager"
                        />
                        <p className="mt-8 max-w-md text-center text-lg text-white/80">
                            Welcome to the NKRC Admin Portal. Manage your
                            community and services all in one place.
                        </p>
                    </motion.div>

                    <div className="relative z-20 mt-auto text-center text-sm text-white/60">
                        © {new Date().getFullYear()} NKRC. All rights reserved.
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="flex min-h-full items-center lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto flex w-full flex-col justify-center space-y-6 p-4 sm:w-[350px] sm:p-0"
                    >
                        <div className="flex flex-col space-y-2 text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-base text-muted-foreground">
                                Sign in to access your admin dashboard
                            </p>
                        </div>

                        <LoginForm
                            email={email}
                            password={password}
                            canSignInWithGoogle={canSignInWithGoogle}
                        />

                        <p className="px-2 text-center text-sm text-muted-foreground">
                            Need help?{' '}
                            <a
                                href={`mailto:${config.club.email}`}
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Contact support
                            </a>
                        </p>
                    </motion.div>
                </div>
            </main>
        </BaseLayout>
    );
}
