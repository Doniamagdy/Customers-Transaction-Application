// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CustomerTable from "./components/CustomerTable";
// import TransactionGraph from "./components/TransactionGraph";
// import "./App.css";






// function App() {

//   const baseURL = process.env.NODE_ENV === 'production' 
//   ? 'https://your-server-url.com'  // Replace with your actual server URL
//   : 'http://localhost:3001';  // Example for local develop
//   axios.defaults.baseURL = baseURL;



//   const [customers, setCustomers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [filter, setFilter] = useState({ name: "", amount: "" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/data");
//         setCustomers(response.data.customers);
//         setTransactions(response.data.transactions);
//         setFilteredTransactions(response.data.transactions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const filtered = transactions.filter((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       return (
//         customer &&
//         customer.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//         transaction.amount.toString().includes(filter.amount)
//       );
//     });
//     setFilteredTransactions(filtered);
//   }, [filter, transactions, customers]);

//   const handleFilterChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const handleCustomerSelect = (customerId) => {
//     setSelectedCustomer(customerId);
//   };

//   return (
//     <div className="App">
//       <h1>Customer Transactions</h1>
//       <div className="filters">
//         <input
//           className="form-control"
//           type="text"
//           name="name"
//           placeholder="Filter by customer name"
//           value={filter.name}
//           onChange={handleFilterChange}
//         />
//         <input
//           className="form-control"
//           type="text"
//           name="amount"
//           placeholder="Filter by amount"
//           value={filter.amount}
//           onChange={handleFilterChange}
//         />
//       </div>
//       <CustomerTable
//         customers={customers}
//         transactions={filteredTransactions}
//         onCustomerSelect={handleCustomerSelect}
//       />
//       <TransactionGraph
//         transactions={transactions}
//         selectedCustomer={selectedCustomer}
//       />
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CustomerTable from "./components/CustomerTable";
// import TransactionGraph from "./components/TransactionGraph";
// import "./App.css";

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [filter, setFilter] = useState({ name: "", amount: "" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/data.json"); 
//         setCustomers(response.data.customers);
//         setTransactions(response.data.transactions);
//         setFilteredTransactions(response.data.transactions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const filtered = transactions.filter((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       return (
//         customer &&
//         customer.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//         transaction.amount.toString().includes(filter.amount)
//       );
//     });
//     setFilteredTransactions(filtered);
//   }, [filter, transactions, customers]);

//   const handleFilterChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const handleCustomerSelect = (customerId) => {
//     setSelectedCustomer(customerId);
//   };

//   return (
//     <div className="App">
//       <h1>Customer Transactions</h1>
//       <div className="filters">
//         <input
//           className="form-control"
//           type="text"
//           name="name"
//           placeholder="Filter by customer name"
//           value={filter.name}
//           onChange={handleFilterChange}
//         />
//         <input
//           className="form-control"
//           type="text"
//           name="amount"
//           placeholder="Filter by amount"
//           value={filter.amount}
//           onChange={handleFilterChange}
//         />
//       </div>
//       <CustomerTable
//         customers={customers}
//         transactions={filteredTransactions}
//         onCustomerSelect={handleCustomerSelect}
//       />
//       <TransactionGraph
//         transactions={transactions}
//         selectedCustomer={selectedCustomer}
//       />
//     </div>
//   );
// }

// export default App;


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "/data.json"; // Default to data.json (for production build)
        
        // Check if running in development (localhost)
        if (process.env.NODE_ENV !== 'production') {
          apiUrl = "http://localhost:3001/data"; // Point to local JSON server
        }

        const response = await axios.get(apiUrl);
        setCustomers(response.data.customers);
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
