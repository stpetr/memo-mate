import { useEffect } from 'react'

import { useMount } from 'react-use'
import { Container } from 'react-bootstrap'

import { useNotesStore } from 'store/useNotesStore'
import { useTagsStore } from 'store/useTagsStore'
import { useAuthStore } from 'store/useAuthStore'

import { AppRouter } from './routers/app-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'theme/app.scss'

function App() {
  const { isAuthenticated, isMounted, fetchProfile } = useAuthStore()
  const { fetchNotes } = useNotesStore()
  const { fetchTags } = useTagsStore()

  useMount(() => {
    fetchProfile()
  })

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      fetchNotes()
      fetchTags()
    }
  }, [isAuthenticated, isMounted])

  return (
    <Container>
      {isMounted ? (
        <AppRouter />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  )
}

export default App
