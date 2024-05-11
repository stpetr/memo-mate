import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1,'Email is required')
    .email('Must be valid email address'),
  password: z
    .string()
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1,'Email is required')
    .email('Must be valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters')
    .refine((value) => !value?.match(/\s/), 'Password must not contain spaces'),
  confirmPassword: z
    .string()
    .min(1, 'Password confirmation is required')
    .min(8, 'Password must have at least 8 characters')
    .refine((value) => !value?.match(/\s/), 'Password must not contain spaces'),
}).refine(({ password, confirmPassword }) => {
    return confirmPassword === password
  },
  {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }
)
