import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Note } from 'types'

import styles from './note-card.module.scss'

type NoteCardProps = {
  note: Note
}

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  return (
    <Link className={styles.card} to={`/notes/${note.id}`}>
      <span className={styles.cardTitle}>{note.title}</span>
      {note.tags.length > 0 && (
        <div className={styles.cardTags}>
          {note.tags.map((tag) => (
            <span className={styles.cardTag} key={tag.id}>
                {tag.name}
              </span>
          ))}
        </div>
      )}
    </Link>
  )
}
