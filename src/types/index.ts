export type TagData = {
  id?: string
  name: string
}

export type Tag = {
  id: string
} & TagData

export type NoteData = {
  id?: string
  title: string
  markdown: string
  tags: Tag[]
}

export type Note = {
  id?: string
  title: string
  markdown: string
  tags: Tag[]
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginResponseData = {
  code: number
}

export type RegisterFormData = {
  email: string
  password: string
  repeatPassword: string
}

export type User = {
  // id: string
  email: string
  name?: string
}
