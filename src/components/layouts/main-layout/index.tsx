import { useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useToggle, useClickAway, useKeyPressEvent } from 'react-use'

import { useAuthStore } from 'store/useAuthStore'

import styles from './main-layout.module.scss'

export const MainLayout = () => {
  const { isAuthenticated, user, setUnauthenticated } = useAuthStore()

  const [isProfileMenuOpen, toggleProfileMenuOpen] = useToggle(false)
  const profileNavRef = useRef(null)

  useClickAway(profileNavRef, () => {
    toggleProfileMenuOpen(false)
  })

  useKeyPressEvent('Escape', () => {
    toggleProfileMenuOpen(false)
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const handleLogout = () => {
    setUnauthenticated()
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.profileNavWrap} ref={profileNavRef}>
          <button className={styles.profileNavToggle} onClick={toggleProfileMenuOpen}>
            {user?.email?.charAt(0)}
          </button>
          {isProfileMenuOpen && (
            <nav className={styles.profileNav}>
              <p>{user?.email}</p>
              <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </nav>
          )}
        </div>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  )
}
