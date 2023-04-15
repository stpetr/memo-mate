import axios from 'axios'
import create from 'zustand'

import { Note, NoteData } from 'types'

import { API_URL } from './constants'

interface NotesStore {
  notes: Note[]
  fetchNotes: () => void
  createNote: (data: NoteData) => void
  updateNote: (id: string, data: NoteData) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesStore>((set, get) => {
  return {
    notes: [],
    fetchNotes: async () => {
      const res = await axios.get(`${API_URL}/notes`)
      if (res.data) {
        set({ notes: res.data })
      } else {
        console.error('Failed fetching notes')
      }
    },
    createNote: async (data) => {
      const res = await axios.post(`${API_URL}/notes`, data)
      if (res.data) {
        set((prevState) => ({
          notes: [...prevState.notes, res.data],
        }))
      }
    },
    updateNote: async (id, data) => {
      const res = await axios.patch(`${API_URL}/notes/${id}`, data)
      if (res.data) {
        set((prevState) => ({
          notes: prevState.notes.map((el) => {
            if (el.id === res.data.id) {
              return res.data
            }
            return el
          })
        }))
      }
    },
    deleteNote: async (id) => {
      const res = await axios.delete(`${API_URL}/notes/${id}`)
      if (res.data) {
        set((prevState) => ({
          notes: prevState.notes.filter((el) => el.id !== res.data.id)
        }))
      }
      console.log('delete note res', res)
    }
  }
})
