import { useNotesStore } from 'store/useNotesStore'
import { NoteForm } from 'components/note/note-form'

import { NoteData } from 'types'

export const NewNote = () => {
  const { createNote } = useNotesStore()

  const onSubmit = (data: NoteData) => {
    createNote(data)
  }

  return (
    <div>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit}  />
    </div>
  )
}
