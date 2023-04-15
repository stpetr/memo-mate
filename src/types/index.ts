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
  id: string
} & NoteData


export type RawNoteData = {
  title: string
  markdown: string
  tagsIds: string[]
}

export type RawNote = {
  id: string
} & RawNoteData
