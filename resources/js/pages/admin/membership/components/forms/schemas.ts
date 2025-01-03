import { z } from 'zod';

export const personalFormSchema = z.object({
    first_name: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters.' })
        .max(30, {
            message: 'First name must not be longer than 30 characters.',
        }),
    last_name: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' })
        .max(30, {
            message: 'Last name must not be longer than 30 characters.',
        }),
    middle_name: z
        .string()
        .max(30, {
            message: 'Middle name must not be longer than 30 characters.',
        })
        .optional(),
    rotary_id: z
        .string()
        .max(20, {
            message: 'Rotary ID must not be longer than 20 characters.',
        })
        .optional(),
    gender: z.string({
        required_error: 'Please select a gender.',
    }),
    membership_type: z.string({
        required_error: 'Please select a membership type.',
    }),
    status: z.string({
        required_error: 'Please select a status.',
    }),
    date_of_birth: z.date().optional(),
    induction_date: z.date().optional(),
    is_in_good_standing: z.boolean().default(true),
});

const phoneRegex = /^\+[1-9]\d{1,14}$/;

export const contactFormSchema = z.object({
    primary_phone: z
        .string()
        .regex(
            phoneRegex,
            'Phone number must be in international format (e.g., +1234567890)',
        )
        .min(1, 'Phone number is required'),
    primary_phone_whatsapp: z.boolean().default(false),
    secondary_phone: z
        .string()
        .regex(
            phoneRegex,
            'Phone number must be in international format (e.g., +1234567890)',
        )
        .optional(),
    secondary_phone_whatsapp: z.boolean().default(false),
    primary_email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    secondary_email: z.string().email('Invalid email address').optional(),
});
