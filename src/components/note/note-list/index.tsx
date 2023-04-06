import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import ReactSelect from 'react-select'

import { NoteCard } from 'components/note/note-card'

import { Note, Tag } from 'types'

type NoteListProps = {
  notes: Note[]
  availableTags: Tag[]
}

export const  NoteList = ({ notes, availableTags }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const titleMatch = title.trim() === '' || note.title.toLowerCase().includes(title.toLowerCase())
      const tagsMatch = selectedTags.length === 0 || selectedTags.every((tag) => {
        return note.tags.some((el) => el.id === tag.id)
      })

      return titleMatch && tagsMatch
    })
  }, [notes, title, selectedTags])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={availableTags.map(({id, label}) => ({ label, value: id }))}
                value={selectedTags.map(({id, label}) => ({ label, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label, value }) => ({label, id: value})))}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </>
  )
}
