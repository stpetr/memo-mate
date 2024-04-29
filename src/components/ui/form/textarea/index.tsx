import { FC, TextareaHTMLAttributes, useId } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import cn from 'utils/helpers/class-names'

import styles from './textarea.module.scss'

type TextareaProps = {
  className?: string
  labelClassName?: string
  fieldClassName?: string
  errorClassName?: string
  label?: string
  register?: () => UseFormRegisterReturn
  error?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: FC<TextareaProps> = (props) => {
  const {
    className,
    fieldClassName,
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
      <textarea
        id={id}
        className={cn(styles.field, fieldClassName)}
        {...register?.()}
        {...rest}
      />
      {!!error && <div className={cn(styles.error, errorClassName)}>{error}</div>}
    </div>
  )
}