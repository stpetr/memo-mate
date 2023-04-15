import { useNote } from 'hooks/useNote'
import { useNotesStore } from 'store/useNotesStore'
import { NoteForm } from 'components/note/note-form'

import { NoteData } from 'types'

export const EditNote = () => {
  const note = useNote()
  const { updateNote } = useNotesStore()

  const onSubmit = (id: string, data: NoteData) => {
    updateNote(id, data)
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        noteData={note}
      />
    </div>
  )
}
