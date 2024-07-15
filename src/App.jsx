
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filter, setFilter] = useState({ name: "", amount: "" });

//////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = process.env.PUBLIC_URL + "/data.json"; 
        
        if (process.env.NODE_ENV === 'development') {
          apiUrl = "/data.json"; // For local development
        }
  
        const response = await axios.get(apiUrl);
        console.log(response);
        setCustomers(response.data.customers);
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  ////////////////////////////////////
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return (
        customer &&
        customer.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        transaction.amount.toString().includes(filter.amount)
      );
    });
    setFilteredTransactions(filtered);
  }, [filter, transactions, customers]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  return (
    <div className="App">
      <h1>Customer Transactions</h1>
      <div className="filters">
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Filter by customer name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          className="form-control"
          type="text"
          name="amount"
          placeholder="Filter by amount"
          value={filter.amount}
          onChange={handleFilterChange}
        />
      </div>
      <CustomerTable
        customers={customers}
        transactions={filteredTransactions}
        onCustomerSelect={handleCustomerSelect}
      />
      <TransactionGraph
        transactions={transactions}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
}

export default App;
