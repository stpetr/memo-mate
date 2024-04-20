import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import ReactSelect from 'react-select'

import { useNotesStore } from 'store/useNotesStore'
import { useTagsStore } from 'store/useTagsStore'
import { NoteCard } from 'components/note/note-card'

import { Tag } from 'types'

export const  NoteList = () => {
  const { notes } = useNotesStore()
  const { tags } = useTagsStore()
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
          <h1>My Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/notes/new">
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
                options={tags.map(({id, name}) => ({ label: name, value: id }))}
                value={selectedTags.map(({id, name}) => ({ label: name, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label: name, value }) => ({name, id: value})))}
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
