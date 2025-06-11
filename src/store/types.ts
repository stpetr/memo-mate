import { StateCreator } from 'zustand'

export type StateCreatorWithDevtools<T> = StateCreator<T, [['zustand/devtools', never]], []>
