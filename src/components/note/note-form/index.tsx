import { FormEvent, useRef, useState } from 'react'

import { v4 as uuidV4 } from 'uuid'

import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'

import { NoteData, Tag } from 'types'
import { useNavigate } from 'react-router-dom'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  const handleCreateTag = (label: string) => {
    const newTag = {
      id: uuidV4(),
      label,
    }
    onAddTag(newTag)
    setSelectedTags((prevState) => [...prevState, newTag])
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                options={availableTags.map(({id, label}) => ({ label, value: id }))}
                value={selectedTags.map(({id, label}) => ({ label, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label, value }) => ({label, id: value})))}
                onCreateOption={handleCreateTag}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as="textarea" rows={15} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Button type="button" variant="outline-secondary" onClick={() => navigate('..')}>Cancel</Button>
        </Stack>
      </Stack>
    </Form>
  )
}
