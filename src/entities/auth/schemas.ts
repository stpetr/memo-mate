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
