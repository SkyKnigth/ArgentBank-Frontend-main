import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/authSlice'
import logo from '../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.scss'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((s) => s.auth.token)
  const user = useSelector((s) => s.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-items">
        {token ? (
          <>
            <NavLink to="/profile" className="main-nav-item">
              <FontAwesomeIcon icon={faCircleUser} /> {user?.firstName}
            </NavLink>
            <button className="main-nav-item" onClick={handleLogout} aria-label="Sign Out">
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} /> Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}