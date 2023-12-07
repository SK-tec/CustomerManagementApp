import React, { useState, useEffect } from "react";
import axios from "axios";
const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [editedRecord, setEditedRecord] = useState({});
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((res) => {
        console.log(res.data);
        setCustomerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = (customerId) => {
    setCurrentlyEditingId(customerId);
    // Reset editedRecord to the current customer's data
    setEditedRecord(
      customerList.find((customer) => customer.id === customerId)
    );
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:8080/api/customers/${id}`, editedRecord)
      .then((res) => {
        console.log(res.data);
        setCurrentlyEditingId(null);
        // Reset editedRecord after saving
        setEditedRecord({});
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/customers/${id}`);
    console.log(id);
  };
  return (
    <>
      <div className="container table-responsive-lg">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Customer Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  {currentlyEditingId === customer.id ? (
                    <input
                      type="text"
                      defaultValue={customer.firstName}
                      name="firstName"
                      onChange={onInputChange}
                    />
                  ) : (
                    customer.firstName
                  )}
                </td>
                <td>
                  {currentlyEditingId === customer.id ? (
                    <input
                      type="text"
                      name="lastName"
                      defaultValue={customer.lastName}
                      onChange={onInputChange}
                    />
                  ) : (
                    customer.lastName
                  )}
                </td>
                <td>
                  {currentlyEditingId === customer.id ? (
                    <input
                      type="text"
                      name="email"
                      defaultValue={customer.email}
                      onChange={onInputChange}
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td>
                  {currentlyEditingId === customer.id ? (
                    <i
                      className="col btn bi bi-save"
                      onClick={() => handleSaveClick(customer.id)}
                    ></i>
                  ) : (
                    <i
                      className="col btn bi-pencil-square"
                      onClick={() => handleEditClick(customer.id)}
                    ></i>
                  )}
                  <i
                    className="col btn bi-trash"
                    onClick={() => handleDelete(customer.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerList;
