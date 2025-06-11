import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import api from 'services/api'

import { Tag, TagData } from 'types'

import { StateCreatorWithDevtools } from './types'

import { API_URL, DEVTOOLS_PREFIX } from './constants'

interface TagsStore {
  tags: Tag[]
  fetchTags: () => void
  createTag: (tag: TagData) => Promise<Tag>
}

const createTagsStore: StateCreatorWithDevtools<TagsStore> = (set) => {
  return {
    tags: [],
    fetchTags: async () => {
      const res = await api.get(`${API_URL}/tags`)
      if (res.data) {
        set({ tags: res.data }, false, 'fetchTags')
      } else {
        console.error('Failed fetching tags')
      }
    },
    createTag: async (data: TagData) => {
      const res = await api.post<Tag>(`${API_URL}/tags`, data)
      if (res.data) {
        set((prevState) => ({
          tags: [...prevState.tags, res.data],
        }), false, 'createTag')
      }

      return res.data
    }
  }
}

export const useTagsStore = create<TagsStore>()(
  devtools(
    createTagsStore,
    { name: `${DEVTOOLS_PREFIX} Tags` }
  )
)
