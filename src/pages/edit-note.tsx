import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNote } from 'hooks/useNote'
import { useNotesStore } from 'store/useNotesStore'
import { NoteForm } from 'components/note/note-form'

import { NoteFormData } from 'entities/note/types'

export const EditNote = () => {
  const note = useNote()
  const navigate = useNavigate()
  const [isSubmitFailed, setIsSubmitFailed, ] = useState(false)

  const { updateNote } = useNotesStore()

  const handleSubmit = async (data: NoteFormData) => {
    const res = await updateNote(data)
    if (!res) {
      setIsSubmitFailed(true)
      return
    }
    navigate('/notes')
  }

  const handleCancel = () => {
    navigate('/notes')
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        noteData={note}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      {isSubmitFailed && <div>An error occurred while saving the note, please try again</div>}
    </div>
  )
}
