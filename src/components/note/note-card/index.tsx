import { Link } from 'react-router-dom'

import { Badge, Card, Stack } from 'react-bootstrap'

import { Note } from 'types'

import styles from './note-card.module.scss'

type NoteCardProps = {
  note: Note
}

export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`${note.id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{note.title}</span>
          {note.tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
              className="justify-content-center flex-wrap"
            >
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.name}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}
