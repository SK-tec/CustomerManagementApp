import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);
  return (
    <div className="App">
      <h1 className="text-center text-warning">Customer Service App</h1>
      <h2>Customer's List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            Name: {customer.firstName}
            {customer.lastName} - Email: {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
