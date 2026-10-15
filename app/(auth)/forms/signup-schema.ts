import { z } from 'zod';
import { getPasswordSchema } from './password-schema';

export const getSignupSchema = (t?: (key: string) => string) => {
  return z
    .object({
      firstName: z
        .string()
        .min(2, { message: t?.('signup.firstName.minLength') || 'First name must be at least 2 characters long.' }),
      lastName: z
        .string()
        .min(2, { message: t?.('signup.lastName.minLength') || 'Last name must be at least 2 characters long.' }),
      userName: z
        .string()
        .min(1, { message: t?.('signup.userName.required') || 'National code is required.' })
        .regex(/^\d{10}$/, { message: t?.('signup.userName.invalid') || 'National code must be exactly 10 digits.' }),
      email: z
        .string()
        .email({ message: t?.('signup.email.invalid') || 'Please enter a valid email address.' })
        .min(1, { message: t?.('signup.email.required') || 'Email is required.' }),
      phone: z
        .string()
        .min(1, { message: t?.('signup.phone.required') || 'Phone number is required.' }),
      password: getPasswordSchema(),
      passwordConfirmation: z.string().min(1, {
        message: t?.('signup.passwordConfirmation.required') || 'Password confirmation is required.',
      }),
      accept: z.boolean().refine((val) => val === true, {
        message: t?.('signup.acceptTerms.required') || 'You must accept the terms and conditions.',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t?.('signup.passwordConfirmation.mismatch') || 'Passwords do not match.',
      path: ['passwordConfirmation'],
    });
};

export type SignupSchemaType = z.infer<ReturnType<typeof getSignupSchema>>;
