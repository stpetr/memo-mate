import { useNote } from 'hooks/useNote'

import { NoteView } from 'components/note/note-view'

type ViewNoteProps = {
  onDelete: (id: string) => void
}

export const ViewNote = ({ onDelete }: ViewNoteProps) => {
  const note = useNote()

  return (
    <NoteView note={note} onDelete={onDelete} />
  )
}
