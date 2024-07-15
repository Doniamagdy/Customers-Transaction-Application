import React from 'react';

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
  const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map(transaction => {
          const customer = customers.find(c => c.id === transaction.customer_id);
          return (
            <tr key={transaction.id} onClick={() => onCustomerSelect(transaction.customer_id)}>
              <td>{customer ? customer.name : 'Unknown'}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount} EGP</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerTable;
