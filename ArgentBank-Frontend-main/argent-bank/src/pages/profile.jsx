import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateUserName } from '../API/api'
import { setUser, updateUsernameSuccess } from '../Redux/authSlice'
import EditName from '../components/EditName'
import '../styles/profile.scss'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    getUserProfile(token)
      .then((u) => dispatch(setUser(u)))
      .catch((err) => console.error('Error fetching profile:', err))
  }, [token, dispatch, navigate])


  const handleSave = async (newName) => {
    try {
      await updateUserName(token, newName)
      dispatch(updateUsernameSuccess(newName))
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating username:', err)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }




  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      desc: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      desc: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      desc: 'Current Balance',
    },
  ]

  return (
    <main className="main bg-dark profile">
      <section className="profile-header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back<br />
              {user?.firstName} {user?.lastName}!
            </h1>
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          </>
        ) : (
          <EditName
            currentName={user?.userName || ''}
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </section>

      <h2 className="sr-only">Accounts</h2>
      <section className="accounts">
        {accounts.map((acc, idx) => (
          <div className="account" key={idx}>
            <div className="account-content">
              <h3>{acc.title}</h3>
              <p className="amount">{acc.amount}</p>
              <p className="desc">{acc.desc}</p>
            </div>
            <button
              className="transaction-button"
               onClick={() => navigate('/transactions')}
            >
              View transactions
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}