import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/header'
import Footer from './components/Footer'
import Home from './pages/home'
import Login from './pages/login'
import Profile from './pages/profile'
import Transactions from './pages/transactions'
import './App.scss'

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={token ? <Transactions /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App