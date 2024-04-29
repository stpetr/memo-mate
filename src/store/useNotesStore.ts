import create from 'zustand'
import { devtools } from 'zustand/middleware'

import api from 'services/api'

import { Note } from 'types'
import { StateCreatorWithDevtools } from 'store/types'
import { NoteFormData } from 'entities/note/types'

interface NotesStore {
  notes: Note[]
  fetchNotes: () => void
  createNote: (data: NoteFormData) => Promise<Note | null>
  updateNote: (data: NoteFormData) => Promise<Note | null>
  deleteNote: (id: string) => void
}

const createNotesStore: StateCreatorWithDevtools<NotesStore> = (set) => {
  return {
    notes: [],
    fetchNotes: async () => {
      try {
        const res = await api.get(`/notes`)
        set({ notes: res.data }, false, 'fetchNotes')
      } catch (error) {
        console.error('Failed fetching notes', error)
      }
    },
    createNote: async (data) => {
      try {
        const res = await api.post(`/notes`, data)
        set((prevState) => ({
          notes: [...prevState.notes, res.data],
        }), false, 'createNote')
        return res.data
      } catch(error) {
        console.error('Could not create note', error)
        return null
      }
    },
    updateNote: async (data) => {
      try {
        const res = await api.patch(`/notes/${data.id}`, data)
        set((prevState) => ({
          notes: prevState.notes.map((el) => {
            if (el.id === res.data.id) {
              return res.data
            }
            return el
          })
        }), false, 'updateNote')
        return res.data
      } catch (error) {
        console.error('Could not update note', error)
        return null
      }
    },
    deleteNote: async (id) => {
      try {
        const res = await api.delete(`/notes/${id}`)
        set((prevState) => ({
          notes: prevState.notes.filter((el) => el.id !== res.data.id)
        }), false, 'deleteNote')
      } catch (error) {
        console.error('Could not delete note', error)
      }
    }
  }
}

export const useNotesStore = create<NotesStore>()(
  devtools(
    createNotesStore,
    { name: 'Notes', enabled: true }
  )
)
