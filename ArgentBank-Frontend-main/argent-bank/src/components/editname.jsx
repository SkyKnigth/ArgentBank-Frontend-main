import { useState } from 'react'

function EditName({ currentName, firstName, lastName, onSave, onCancel }) {
  const [newName, setNewName] = useState(currentName)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(newName.trim())
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>
      <div className="edit-fields">
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <input type="text" value={firstName} disabled />
        <input type="text" value={lastName} disabled />
      </div>
      <div className="edit-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default EditName