import { useNote } from 'hooks/useNote'
import { NoteView } from 'components/note/note-view'

export const ViewNote = () => {
  const note = useNote()

  return (
    <NoteView note={note} />
  )
}
