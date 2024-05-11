import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from 'store/useAuthStore'

import styles from './auth-layout.module.scss'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className={styles.layoutContainer}>
      <Outlet />
    </div>
  )
}
