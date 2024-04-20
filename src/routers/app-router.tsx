import { Route, Routes } from 'react-router-dom'

import { Home } from 'pages/home'
import { Login } from 'pages/login'
import { NewNote } from 'pages/new-note'
import { ViewNote } from 'pages/view-note'
import { EditNote } from 'pages/edit-note'
import { Notes } from 'pages/notes'

import { AuthLayout } from 'components/layouts/auth-layout'
import { MainLayout } from 'components/layouts/main-layout'
import { NoteLayout } from 'components/note/note-layout'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        element={<AuthLayout />}
      >
        <Route
          path="/login"
          element={<Login />}
        />
      </Route>
      <Route
        element={<MainLayout />}
      >
        <Route
          path="/notes"
        >
          <Route index element={<Notes />} />
          <Route path="new" element={<NewNote />} />
          <Route
            path=":id"
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
        </Route>
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}
