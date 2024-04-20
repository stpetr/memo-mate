import { Link, Navigate } from 'react-router-dom'

import { useAuthStore } from 'store/useAuthStore'

export const Home = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div>
      <h1>MemoMate</h1>

      {isAuthenticated ? (
        <Navigate to={'/notes'} />
      ) : (
        <div>To see your notes you must be authenticated. Please go to <Link to={'/login'}>login</Link> page</div>
      )}
    </div>
  )
}
