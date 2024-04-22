import { FC, InputHTMLAttributes, useId } from 'react'

import { UseFormRegisterReturn } from 'react-hook-form'

import cn from 'utils/helpers/class-names'

import styles from './input.module.scss'

type InputProps = {
  className?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  label?: string
  register?: () => UseFormRegisterReturn
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    inputClassName,
    labelClassName,
    errorClassName,
    label,
    register,
    error,
    ...rest
  } = props

  const id = rest.id ?? useId()

  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <label className={cn(styles.label, labelClassName)} htmlFor={id}>{label}</label>
      )}
      <input
        id={id}
        className={cn(styles.input)}
        {...register?.()}
        {...rest}
      />
      {!!error && <div className={cn(styles.error, errorClassName)}>{error}</div>}
    </div>
  )
}
