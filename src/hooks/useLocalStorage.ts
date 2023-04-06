import { useEffect, useState } from 'react'

type DataType<T> = T | (() => T)

export const useLocalStorage = <T>(key: string, defaultValue: DataType<T>) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof defaultValue === 'function') {
        return (defaultValue as () => T)()
      }
      return defaultValue
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])

  return [value, setValue] as [T, typeof setValue]
}
