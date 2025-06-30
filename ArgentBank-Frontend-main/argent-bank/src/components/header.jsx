import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/authSlice'
import logo from '../assets/argentBankLogo.png'
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div>
        {token ? (
          <>
            {user?.userName && (
              <NavLink to="/profile" className="main-nav-item">
                <i className="fa fa-user-circle"></i> {user.userName}
              </NavLink>
            )}
            <button className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Header