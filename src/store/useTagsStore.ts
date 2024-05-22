import create from 'zustand'

import api from 'services/api'

import { Tag, TagData } from 'types'

import { API_URL } from './constants'

interface TagsStore {
  tags: Tag[]
  fetchTags: () => void
  createTag: (tag: TagData) => Promise<Tag>
}

export const useTagsStore = create<TagsStore>((set, get) => {
  return {
    tags: [],
    fetchTags: async () => {
      const res = await api.get(`${API_URL}/tags`)
      if (res.data) {
        set({ tags: res.data })
      } else {
        console.error('Failed fetching tags')
      }
    },
    createTag: async (data: TagData) => {
      const res = await api.post<Tag>(`${API_URL}/tags`, data)
      if (res.data) {
        set((prevState) => ({
          tags: [...prevState.tags, res.data],
        }))
      }

      return res.data
    }
  }
})
