import { useRef } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
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
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>MemoMate</Link>
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
        </div>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          @ {new Date().getFullYear()} Some rights reserved
        </div>
      </footer>
    </div>
  )
}
