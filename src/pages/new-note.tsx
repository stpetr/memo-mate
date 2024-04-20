import { useNotesStore } from 'store/useNotesStore'
import { NoteForm } from 'components/note/note-form'

import { NoteData } from 'types'
import { Link } from 'react-router-dom'

export const NewNote = () => {
  const { createNote } = useNotesStore()

  const onSubmit = (data: NoteData) => {
    createNote(data)
  }

  return (
    <div>
      <h1>New Note</h1>
      <Link to="/notes">Go back</Link>
      <NoteForm onSubmit={onSubmit}  />
    </div>
  )
}
