import { z } from 'zod';

export const getSigninSchema = (t?: (key: string) => string) => {
  return z.object({
    userName: z
      .string()
      .min(1, {
        message: t?.('signin.userName.required') || 'National code is required.',
      }),
    password: z
      .string()
      .min(1, {
        message: t?.('signin.password.required') || 'Password is required.',
      }),
    rememberMe: z.boolean().optional(),
  });
};

export type SigninSchemaType = z.infer<ReturnType<typeof getSigninSchema>>;
