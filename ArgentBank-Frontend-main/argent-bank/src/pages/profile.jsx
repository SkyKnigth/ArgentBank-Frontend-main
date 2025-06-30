import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateUserName } from '../API/api'
import { setUser } from '../Redux/authSlice'
import EditName from '../components/editname'
import '../styles/profile.scss'

function Profile() {
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

    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile(token)
        dispatch(setUser(userData))
      } catch (err) {
        console.error(err)
      }
    }

    fetchProfile()
  }, [token, dispatch, navigate])

  const handleSave = async (newName) => {
    try {
      const updatedUser = await updateUserName(token, newName)
      dispatch(setUser(updatedUser))
      setIsEditing(false)
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error('Erreur lors de la mise à jour du pseudo')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <main className="main bg-white">
      <div className="header">
        {isEditing ? (
          <EditName
            currentName={user?.userName || ''}
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <h1>Welcome back<br />{user?.userName}!</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {[
        {
          title: 'Argent Bank Checking (x8349)',
          amount: '$2,082.79',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Savings (x6712)',
          amount: '$10,928.42',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Credit Card (x8349)',
          amount: '$184.30',
          description: 'Current Balance',
        },
      ].map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">
              <i className="fa fa-chevron-right" />
            </button>
          </div>
        </section>
      ))}
    </main>
  )
}

export default Profile