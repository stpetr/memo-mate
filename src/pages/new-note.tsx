import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotesStore } from 'store/useNotesStore'
import { NoteForm } from 'components/note/note-form'

import { NoteFormData } from 'entities/note/types'

export const NewNote = () => {
  const { createNote } = useNotesStore()
  const [isSubmitFailed, setIsSubmitFailed, ] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data: NoteFormData) => {
    setIsSubmitFailed(false)
    const res = await createNote(data)
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
      <h1>New Note</h1>
      <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
      {isSubmitFailed && <div>An error occurred while saving the note, please try again</div>}
    </div>
  )
}
