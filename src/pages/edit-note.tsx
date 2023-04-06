import { useNote } from 'hooks/useNote'

import { NoteForm } from 'components/note/note-form'

import { NoteData, Tag } from 'types'

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote()

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        noteData={note}
      />
    </div>
  )
}
