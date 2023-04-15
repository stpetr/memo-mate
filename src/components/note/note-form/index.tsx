import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CreatableSelect from 'react-select/creatable'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'

import { useTagsStore } from 'store/useTagsStore'

import { NoteData, Tag } from 'types'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  noteData?: NoteData
}

export const NoteForm = ({ onSubmit, noteData }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const { tags, createTag } = useTagsStore()
  const [selectedTags, setSelectedTags] = useState<Tag[]>(noteData?.tags || [])
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

  const handleCreateTag = async (name: string) => {
    const tag = await createTag({ name })
    setSelectedTags((prevState) => [...prevState, tag])
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={noteData?.title || ''} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                options={tags.map(({id, name}) => ({ label: name, value: id }))}
                value={selectedTags.map(({id, name}) => ({ label: name, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label: name, value }) => ({name, id: value})))}
                onCreateOption={handleCreateTag}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            required
            defaultValue={noteData?.markdown || ''}
            as="textarea"
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Button type="button" variant="outline-secondary" onClick={() => navigate('..')}>Cancel</Button>
        </Stack>
      </Stack>
    </Form>
  )
}
