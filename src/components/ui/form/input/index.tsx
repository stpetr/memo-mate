import { FC, InputHTMLAttributes } from 'react'

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


  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <label className={cn(styles.label, labelClassName)}>{label}</label>
      )}
      <input
        className={cn(styles.input)}
        {...register?.()}
        {...rest}
      />
      {!!error && <div className={cn(styles.error, errorClassName)}>{error}</div>}
    </div>
  )
}
