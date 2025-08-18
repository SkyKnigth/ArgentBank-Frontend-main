import React, { useState } from "react"
import "../styles/transaction.scss"

const sampleTransactions = [
  {
    id: "1",
    date: "27/02/20",
    description: "Golden Sun Bakery",
    amount: "$8.00",
    balance: "$298.00",
    type: "Electronic",
    category: "Food",
    note: "lorem ipsum",
  },
  {
    id: "2",
    date: "27/02/20",
    description: "Golden Sun Bakery",
    amount: "$8.00",
    balance: "$298.00",
    type: "Electronic",
    category: "Shopping",
    note: "some note",
  },
]

 function Transactions() {
  const [expandedId, setExpandedId] = useState(null)
  const [editCategoryId, setEditCategoryId] = useState(null)
  const [editNoteId, setEditNoteId] = useState(null)
  const [transactions, setTransactions] = useState(sampleTransactions)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleCategoryChange = (id, newCategory) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, category: newCategory } : tx))
    )
    setEditCategoryId(null)
  }

  const handleNoteChange = (id, newNote) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, note: newNote } : tx))
    )
    setEditNoteId(null)
  }

  return (
    <main className="transactions-page bg-dark">
      {/* HEADER SIMILAIRE À PROFILE */}
      <section className="account-header">
        <div className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
        </div>
      </section>

      <section className="transactions-table">
        <div className="table-header">
          <span>Date</span>
          <span>Description</span>
          <span>Amount</span>
          <span>Balance</span>
          <span></span>
        </div>

        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-block">
            <div className="transaction-main" onClick={() => toggleExpand(tx.id)}>
              <span>{tx.date}</span>
              <span>{tx.description}</span>
              <span>{tx.amount}</span>
              <span>{tx.balance}</span>
              <span className="toggle-button">▼</span>
            </div>

            {expandedId === tx.id && (
              <div className="transaction-details">
                <div><strong>Transaction type:</strong> {tx.type}</div>

                <div>
                  <strong>Category:</strong>{" "}
                  {editCategoryId === tx.id ? (
                    <select
                      defaultValue={tx.category}
                      onBlur={(e) => handleCategoryChange(tx.id, e.target.value)}
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                    </select>
                  ) : (
                    <>
                      {tx.category}{" "}
                      <button onClick={() => setEditCategoryId(tx.id)}>✏️</button>
                    </>
                  )}
                </div>

                <div>
                  <strong>Note:</strong>{" "}
                  {editNoteId === tx.id ? (
                    <input
                      defaultValue={tx.note}
                      onBlur={(e) => handleNoteChange(tx.id, e.target.value)}
                    />
                  ) : (
                    <>
                      {tx.note}{" "}
                      <button onClick={() => setEditNoteId(tx.id)}>✏️</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}


export default Transactions;