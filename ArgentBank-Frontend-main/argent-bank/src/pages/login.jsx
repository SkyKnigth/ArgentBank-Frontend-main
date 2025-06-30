import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginSuccess } from '../Redux/authSlice'
import { loginUser } from '../API/api' 
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await loginUser(email, password)
      dispatch(loginSuccess({ token }))
      navigate('/profile')
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Identifiants invalides')
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default Login