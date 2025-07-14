import React, { useState } from 'react'
import '../styles/editname.scss'

export default function EditName({ currentName, firstName, lastName, onSave, onCancel }) {
  const [newName, setNewName] = useState(currentName)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(newName.trim())
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>

      <div className="form-row">
        <label htmlFor="username">User name :</label>
        <input
          id="username"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="firstName">First name :</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          disabled
        />
      </div>

      <div className="form-row">
        <label htmlFor="lastName">Last name :</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          disabled
        />
      </div>

      <div className="edit-buttons">
        <button type="submit">Save</button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}