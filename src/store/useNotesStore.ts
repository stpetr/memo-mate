import create from 'zustand'
import { devtools } from 'zustand/middleware'

import api from 'services/api'

import { Note, NoteData } from 'types'
import { StateCreatorWithDevtools } from 'store/types'

interface NotesStore {
  notes: Note[]
  fetchNotes: () => void
  createNote: (data: NoteData) => void
  updateNote: (id: string, data: NoteData) => void
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

      } catch(error) {
        console.error('Could not create note', error)
      }
    },
    updateNote: async (id, data) => {
      try {
        const res = await api.patch(`/notes/${id}`, data)
        set((prevState) => ({
          notes: prevState.notes.map((el) => {
            if (el.id === res.data.id) {
              return res.data
            }
            return el
          })
        }), false, 'updateNote')
      } catch (error) {
        console.error('Could not update note', error)
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
