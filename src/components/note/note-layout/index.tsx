import { Navigate, Outlet, useParams } from 'react-router-dom'

import { Note } from 'types'

type NoteLayoutProps = {
  notes: Note[]
}

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams()

  const note = notes.find((el) => el.id === id)

  if (note == null) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={note} />
}
