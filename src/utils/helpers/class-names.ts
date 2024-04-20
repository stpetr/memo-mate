import { isPlainObject } from './checkers'

type ClassNamesProp = string | Record<string, boolean> | undefined

export const classNames = (...args: ClassNamesProp[]) => {
  return args
    .filter(Boolean)
    .map((el) => {
      if (isPlainObject(el)) {
        return Object.entries(el as Record<string, boolean>)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(' ')
      }

      return el
    })
    .join(' ')
}

export default classNames
