import { Navigate, Outlet, useParams } from 'react-router-dom'

import { useNotesStore } from 'store/useNotesStore'

export const NoteLayout = () => {
  const { id } = useParams()
  const { notes } = useNotesStore()

  const note = notes.find((el) => el.id === id)

  if (note == null) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={note} />
}
