import { useMemo } from 'react'
import { Route, Routes} from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

import { useLocalStorage } from 'hooks/useLocalStorage'

import { Home } from 'pages/home'
import { NewNote } from 'pages/new-note'
import { EditNote } from 'pages/edit-note'
import { ViewNote } from 'pages/view-note'
import { NoteLayout } from 'components/note/note-layout'

import { NoteData, RawNote, Tag } from 'types'

import 'bootstrap/dist/css/bootstrap.min.css'

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

  const handleUpdateNote = (id: string, { tags, ...data}: NoteData) => {
    setNotes((prevState) => {
      return prevState.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagsIds: tags.map((tag) => tag.id)
          }
        }
        return note
      })
    })
  }

  const handleDeleteNote = (id: string) => {
    setNotes((prevState) => {
      return prevState.filter((note) => note.id !== id)
    })
  }

  const handleAddTag = (tag: Tag) => {
    setTags((prevState) => [...prevState, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<Home notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={handleCreateNote}
              onAddTag={handleAddTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/:id"
          element={<NoteLayout notes={notesWithTags} />}
        >
          <Route
            index
            element={<ViewNote onDelete={handleDeleteNote} />}
          />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={handleUpdateNote}
                onAddTag={handleAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Container>
  )
}

export default App
