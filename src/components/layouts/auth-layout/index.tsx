import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from 'store/useAuthStore'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />
  }

  return <Outlet />
}
