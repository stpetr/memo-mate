import { Link, useNavigate } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'

import { Badge as AppBadge } from 'components/ui/badge'
import { Button as AppButton } from 'components/ui/button'

import { useNotesStore } from 'store/useNotesStore'

import { Note } from 'types'

import styles from './note-view.module.scss'

type NoteViewProps = {
  note: Note
}

export const NoteView = ({ note }: NoteViewProps) => {
  const navigate = useNavigate()
  const { deleteNote } = useNotesStore()

  const handleDelete = async () => {
    if (note.id) {
      await deleteNote(note.id)
    }
    navigate('/notes')
  }

  return (
    <div className={styles.noteView}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>{note.title}</h1>
          <div className={styles.tags}>
            {note.tags.map((tag) => (
              <AppBadge key={tag.id} pill={true}>
                {tag.name}
              </AppBadge>
            ))}
          </div>
        </div>
        <div className={styles.actionButtons}>
          <Link to={`/notes/${note.id}/edit`}>
            <AppButton>Edit</AppButton>
          </Link>
          <AppButton  onClick={handleDelete}>Delete</AppButton>
          <Link to="..">
            <AppButton>Back</AppButton>
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
