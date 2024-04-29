import { z } from 'zod'
import { noteSchema } from './schema'

export type NoteFormData = z.infer<typeof noteSchema>
