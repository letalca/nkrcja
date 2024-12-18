import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please enter your email' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, {
            message: 'Please enter your password',
        })
        .min(7, {
            message: 'Password must be at least 7 characters long',
        }),
    remember: z.boolean().optional().default(false),
});

export type LoginData = z.infer<typeof loginFormSchema>;
