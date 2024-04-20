import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from 'store/useAuthStore'

import styles from './auth-login.module.scss'

const schema = z.object({
  email: z
    .string()
    .min(1,'Email is required')
    .email('Must be valid email address'),
  password: z
    .string()
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
})

type FormFields = z.infer<typeof schema>

export const AuthLogin = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormFields>({
    // mode: 'onBlur',
    defaultValues: {
      // email: 'petr.sdkb@gmail.com',
    },
    resolver: zodResolver(schema),
  })

  const { signIn } = useAuthStore()

  const onSubmit: SubmitHandler<FormFields> = async ({email, password}) => {
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
          <input
            {...register('email')}
            className={styles.formInput}
            type="email"
            placeholder="Email"
          />
          {errors.email && <div className={styles.formInputError}>{errors.email.message}</div>}
        </div>
        <div>
          <input
            {...register('password')}
            className={styles.formInput}
            type="password"
            placeholder="Password"
          />
          {errors.password && <div className={styles.formInputError}>{errors.password.message}</div>}
        </div>
        <button className={styles.formSubmitBtn}>{isSubmitting ? 'Loading...' : 'Submit'}</button>
        {errors.root && <div className={styles.formInputError}>{errors.root.message}</div>}
      </form>
    </div>
  )
}
