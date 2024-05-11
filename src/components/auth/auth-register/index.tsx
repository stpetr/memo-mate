import { useState } from 'react'
import { Link } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from 'store/useAuthStore'

import { Input } from 'components/ui/form/input'

import { RegisterSchema } from 'entities/auth/types'
import { registerSchema } from 'entities/auth/schemas'

import layoutStyles from 'components/layouts/auth-layout/auth-layout.module.scss'
import styles from './auth-register.module.scss'

export const AuthRegister = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const { signUp } = useAuthStore()

  const onSubmit: SubmitHandler<RegisterSchema> = async ({email, password, confirmPassword}) => {
    const data = await signUp({
      email,
      password,
      confirmPassword
    })

    if (data.ok) {
      setIsSubmitSuccess(true)
    } else {
      let error = 'Something went wrong, please check your input and try again'
      if (data.error) {
        error = Array.isArray(data.error) ? data.error.join('\n') : data.error
      }
      setError('root', {
        message: error
      })
    }
  }

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={layoutStyles.heading}>Register</h1>
      <form className={layoutStyles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            register={() => register('email')}
            placeholder="Email"
            error={errors.email?.message}
            errorClassName={layoutStyles.formInputError}
          />
        </div>

        <div>
          <Input
            register={() => register('password')}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            errorClassName={layoutStyles.formInputError}
          />
        </div>

        <div>
          <Input
            register={() => register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            errorClassName={layoutStyles.formInputError}
          />
        </div>

        <button
          className={layoutStyles.formSubmitBtn}
          disabled={isSubmitting || isSubmitSuccess}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        {errors.root && <div className={layoutStyles.formInputError}>{errors.root.message}</div>}
      </form>

      <div className={layoutStyles.bottom}>
        {isSubmitSuccess ? (
          <span className={styles.successMessage}>
            You have successfully registered. Go to <Link to="/login" className={styles.loginLink}>Login</Link> page
          </span>
        ) : (
          <span>Already have account? <Link to="/login" className={styles.loginLink}>Login</Link></span>
        )}
      </div>
    </div>
  )
}
