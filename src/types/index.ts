export type TagData = {
  id?: string
  name: string
}

export type Tag = {
  id: string
} & TagData

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
  confirmPassword: string
}

export type RegisterResponseData = {
  ok: boolean
  user?: User
  error?: string | string[]
}

export type User = {
  // id: string
  email: string
  name?: string
}
