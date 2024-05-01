import { useEffect } from 'react'

import { useMount } from 'react-use'

import { useNotesStore } from 'store/useNotesStore'
import { useTagsStore } from 'store/useTagsStore'
import { useAuthStore } from 'store/useAuthStore'

import { AppRouter } from './routers/app-router'

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
    <>
      {isMounted ? (
        <AppRouter />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default App
