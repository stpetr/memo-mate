import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from 'store/useAuthStore'

import { Input } from 'components/ui/form/input'

import { LoginSchema } from 'entities/auth/types'
import { loginSchema } from 'entities/auth/schemas'

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
    <div className={styles.authLogin}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            register={() => register('email')}
            placeholder="Email"
            error={errors.email?.message}
            errorClassName={styles.formInputError}
          />
        </div>

        <div>
          <Input
            register={() => register('password')}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            errorClassName={styles.formInputError}
          />
        </div>
        <button className={styles.formSubmitBtn}>{isSubmitting ? 'Loading...' : 'Submit'}</button>
        {errors.root && <div className={styles.formInputError}>{errors.root.message}</div>}
      </form>
    </div>
  )
}
