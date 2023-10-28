import * as z from 'zod';

export const loginSchema = z.object({
  username: z
    .string({ description: 'username required' })
    .min(6, 'Minimum character length for username is 6')
    .max(12, 'Maximum character length for username is 12'),
  password: z
    .string({ description: 'password required' })
    .min(6, 'Minimum character length for password is 6')
    .max(12, 'Maximum character length for password is 12'),
});

export const registerSchema = z
  .object({
    email: z.string().email('It should be email address'),
    // name: z.string().min(3, 'Minimum character length for name is 3'),
  })
  .merge(loginSchema);
