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
