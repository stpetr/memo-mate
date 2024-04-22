import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import ReactSelect from 'react-select'

import { useNotesStore } from 'store/useNotesStore'
import { useTagsStore } from 'store/useTagsStore'

import { NoteCard } from 'components/note/note-card'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/form/input'

import { Tag } from 'types'

import styles from './note-list.module.scss'

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>My Notes</h1>
        <div className={styles.headerButtons}>
          <Link to="/notes/new">
            <Button>Create Note</Button>
          </Link>
          <Button>Edit Tags</Button>
        </div>
      </div>
      <div className={styles.filter}>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Tags
          <ReactSelect
            options={tags.map(({id, name}) => ({ label: name, value: id }))}
            value={selectedTags.map(({id, name}) => ({ label: name, value: id }))}
            onChange={(tags) => setSelectedTags(tags.map(({ label: name, value }) => ({name, id: value})))}
            isMulti
          />
        </label>
      </div>

      <div className={styles.cards}>
        {filteredNotes.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>
    </div>
  )
}
