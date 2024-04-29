import { z } from 'zod'

export const noteSchema = z.object({
  id: z
    .string()
    .readonly()
    .optional(),
  title: z
    .string()
    .trim()
    .min(1,'Title is required')
    .min(2,'Title must have at least 2 characters'),
  markdown: z
    .string()
    .trim()
    .min(1, 'Body is required'),
  tags: z
    .array(z.object({
      id: z.string(),
      name: z.string(),
    }))
    .optional()
})
