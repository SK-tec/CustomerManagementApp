import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNewCustomerModal from "./AddNewCustomerModal";

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [editedRecord, setEditedRecord] = useState({});
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        // Update the existing record in the customerList array
        setCustomerList((prevCustomerList) =>
          prevCustomerList.map((customer) =>
            customer.id === id ? { ...customer, ...res.data } : customer
          )
        );

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
  const handleAddCustomer = (newCustomer) => {
    // Add newCustomer to the customerList
    setCustomerList((prevCustomerList) => [...prevCustomerList, newCustomer]);
  };
  return (
    <>
      <div className="container table-responsive-lg">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-warning">
                Customer Id
              </th>
              <th scope="col" className="text-warning">
                First Name
              </th>
              <th scope="col" className="text-warning">
                Last Name
              </th>
              <th scope="col" className="text-warning">
                Email Id
              </th>
              <th scope="col" className="text-warning">
                Actions
              </th>
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
                      value={editedRecord.firstName}
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
                      value={editedRecord.lastName}
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
                      value={editedRecord.email}
                      onChange={onInputChange}
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td>
                  <div className="row">
                    {currentlyEditingId === customer.id ? (
                      <i
                        className="col-5 btn bi bi-save"
                        onClick={() => handleSaveClick(customer.id)}
                      ></i>
                    ) : (
                      <i
                        className="col-5 btn bi-pencil-square"
                        onClick={() => handleEditClick(customer.id)}
                      ></i>
                    )}
                    <i
                      className="col-5 btn bi-trash"
                      onClick={() => handleDelete(customer.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-warning m-3" onClick={handleShowModal}>
        Add Customer
      </div>
      <AddNewCustomerModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddCustomer={handleAddCustomer}
      />
    </>
  );
};

export default CustomerList;
