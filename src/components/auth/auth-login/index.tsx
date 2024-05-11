import { Link } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from 'store/useAuthStore'

import { Input } from 'components/ui/form/input'

import { LoginSchema } from 'entities/auth/types'
import { loginSchema } from 'entities/auth/schemas'

import layoutStyles from 'components/layouts/auth-layout/auth-layout.module.scss'
import styles from './auth-login.module.scss'

export const AuthLogin = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { signIn } = useAuthStore()

  const onSubmit: SubmitHandler<LoginSchema> = async ({email, password}) => {
    const res = await signIn({
      email,
      password,
    })

    if (res.code === 401) {
      setError('root', {
        message: 'You have entered an invalid username or password'
      })
    } else if (res.code === 500) {
      setError('root', {
        message: 'Something went wrong, please try again later'
      })
    }
  }

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={layoutStyles.heading}>Login</h1>
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
        <button
          className={layoutStyles.formSubmitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        {errors.root && <div className={layoutStyles.formInputError}>{errors.root.message}</div>}
      </form>

      <div className={layoutStyles.bottom}>
        Have no account yet? <Link to="/register" className={styles.registerLink}>Register</Link>
      </div>
    </div>
  )
}
