import { Link, useNavigate } from 'react-router-dom'

import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import { Note } from 'types'

type NoteViewProps = {
  note: Note
  onDelete: (id: string) => void
}

export const NoteView = ({ note, onDelete }: NoteViewProps) => {
  const navigate = useNavigate()

  const handleDelete = () => {
    onDelete(note.id)
    navigate('/')
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col >
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
              className="flex-wrap"
            >
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}
