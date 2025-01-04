import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const cellTypes = ['cell', 'mobile', 'work', 'home', 'other'] as const;

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
    email: z
        .string()
        .min(6, { message: 'Email must be at least 6 characters.' })
        .max(30, { message: 'Email must not be longer than 30 characters.' })
        .email({ message: 'Must be a valid email' }),
    date_of_birth: z.date().optional(),
    induction_date: z.date().optional(),
    is_in_good_standing: z.boolean().default(true),
});

const phoneSchema = z.object({
    number: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 digits' })
        .max(15, { message: 'Phone must not be more than 15 digits' }),
    primary: z.boolean().default(false),
    whatsapp: z.boolean().default(false),
    type: z.enum(cellTypes).default('cell'),
});

export const phoneListSchema = z.object({
    phones: z.array(phoneSchema),
});

export const phoneResolver = zodResolver(phoneListSchema);
export const personalDataResolver = zodResolver(personalFormSchema);

export type CellType = (typeof cellTypes)[number];
export type Phones = z.infer<typeof phoneListSchema>;
export type PersonalDataForm = z.infer<typeof personalFormSchema>;
