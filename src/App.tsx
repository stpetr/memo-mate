import { Route, Routes} from 'react-router-dom'

import { useMount } from 'react-use'
import { Container } from 'react-bootstrap'

import { useNotesStore } from 'store/useNotesStore'
import { useTagsStore } from 'store/useTagsStore'

import { Home } from 'pages/home'
import { NewNote } from 'pages/new-note'
import { EditNote } from 'pages/edit-note'
import { ViewNote } from 'pages/view-note'
import { NoteLayout } from 'components/note/note-layout'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const { fetchNotes } = useNotesStore()
  const { fetchTags } = useTagsStore()

  useMount(() => {
    fetchNotes()
    fetchTags()
  })

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/new"
          element={<NewNote />}
        />
        <Route
          path="/:id"
          element={<NoteLayout />}
        >
          <Route
            index
            element={<ViewNote />}
          />
          <Route
            path="edit"
            element={<EditNote />}
          />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Container>
  )
}

export default App
