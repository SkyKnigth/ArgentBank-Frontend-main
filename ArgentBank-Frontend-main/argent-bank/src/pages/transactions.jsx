function Transactions() {
  return (
    <main className="main bg-dark transactions">
      <h2 className="sr-only">Transactions</h2>

      <section className="transaction-details">
        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
        <p className="account-amount">$2,082.79</p>
        <p className="account-amount-description">Available Balance</p>

        <div className="transaction-item">
          <div className="transaction-info">
            <p className="transaction-date">06/20/2024</p>
            <p className="transaction-description">Golden Sun Bakery</p>
          </div>
          <div className="transaction-amount-status">
            <p className="transaction-amount">$8.00</p>
            <p className="transaction-type">Debit</p>
            <p className="transaction-category">Food</p>
            <p className="transaction-note">Breakfast</p>
          </div>
        </div>

        {/* Tu pourras boucler ici plus tard avec des vraies données */}
      </section>
    </main>
  );
}

export default Transactions;