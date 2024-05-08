import { z } from 'zod'

import { loginSchema } from './schemas'

export type LoginSchema = z.infer<typeof loginSchema>
