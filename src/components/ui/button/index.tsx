import { FC, ReactNode } from 'react'

import cn from 'utils/helpers/class-names'

import styles from './button.module.scss'

type ButtonProps = {
  className?: string
  onClick?: () => void
  children?: ReactNode
  type?: 'button' | 'submit'
}

export const Button:FC<ButtonProps> = (props) => {
  const {
    className,
    onClick,
    type = 'button',
    children
  } = props

  return (
    <button
      type={type}
      className={cn(styles.button, className)}
      onClick={onClick}
    >{children}</button>
  )
}
