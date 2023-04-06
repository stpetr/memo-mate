import { Route, Routes} from 'react-router-dom'

import { Container } from 'react-bootstrap'

import { v4 as uuidV4 } from 'uuid'

import { NewNote } from 'pages/new-note'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from 'pages/home'
import { useMemo } from 'react'
import { NoteData, RawNote, Tag } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  const handleCreateNote = ({ tags, ...data}: NoteData) => {
    setNotes((prevState) => {
      return [
        ...prevState,
        {
          ...data,
          id: uuidV4(),
          tagsIds: tags.map(({id}) => id),
        }
      ]
    })
  }

  const handleAddTag = (tag: Tag) => {
    setTags((prevState) => [...prevState, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/new"
          element={(
            <NewNote
              onSubmit={handleCreateNote}
              onAddTag={handleAddTag}
              availableTags={tags}
            />
          )}
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Container>
  )
}

export default App
