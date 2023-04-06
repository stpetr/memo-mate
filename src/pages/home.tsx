import { NoteList } from 'components/note/note-list'

import { Note, Tag } from 'types'

type HomeProps = {
  notes: Note[]
  availableTags: Tag[]
}

export const Home = ({ notes, availableTags }: HomeProps) => {
  return (
    <div>
      <NoteList notes={notes} availableTags={availableTags} />
    </div>
  )
}
