import { FC, ReactNode } from 'react'

import cn from 'utils/helpers/class-names'

import styles from './badge.module.scss'

type BadgeProps = {
  className?: string
  pill?: boolean
  children?: ReactNode
}

export const Badge: FC<BadgeProps> = (props) => {
  const { className, pill = false, children } = props

  return (
    <span className={cn(styles.badge, className, { [styles.pill]: pill })}>{children}</span>
  )
}
