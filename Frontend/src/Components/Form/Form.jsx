import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import add from "/add.svg";
import axios from "axios";

export const CustomerForm = () => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    mobilenumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    if (modalRef.current) {
      if (modalRef.current.open) {
        modalRef.current.close();
      } else {
        modalRef.current.showModal();
      }
    }
  };

  const handleSave = () => {
    modalRef.current.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/customers/new", {
        first_name: formData.firstname,
        last_name: formData.lastname,
        address: formData.address,
        number: formData.mobilenumber,
      });
      if (response.status === 200) {
        console.log("Customer added successfully");
        // Optionally, close the modal and reset the form
        handleSave();
        setFormData({
          firstname: "",
          lastname: "",
          address: "",
          mobilenumber: "",
        });
      } else {
        console.error("Failed to add customer");
      }
    } catch (error) {
      console.error("There was an error adding the customer!", error);
    }
  };

  return (
    <>
      <div
        className="flex btn-add justify-center items-center gap-1 cursor-pointer"
        onClick={handleButtonClick}
      >
        <img src={add} alt="Add" />
        <p>Customer</p>
      </div>
      <dialog ref={modalRef}>
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Add Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  First name
                </label>
                <input
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter first name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Last name
                </label>
                <input
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter last name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Address
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="mobilenumber"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Mobile number
                </label>
                <input
                  required
                  type="text"
                  name="mobilenumber"
                  id="mobilenumber"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter mobile"
                  value={formData.mobilenumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={handleButtonClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export const OrderForm = ({ customer }) => {
  const modalRef = useRef(null);

  const handleButtonClick = () => {
    if (modalRef.current) {
      if (modalRef.current.open) {
        modalRef.current.close();
      } else {
        modalRef.current.showModal();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      item: formData.get("item"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      date: formData.get("date"),
      CId: customer._id, // Replace with actual customer ID
    };

    try {
      const response = await axios.post("/api/orders", data);
      console.log("Order added successfully:", response.data);
      handleButtonClick(); // Close the modal
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  return (
    <>
      <div
        className="flex btn-add justify-center items-center gap-1 cursor-pointer"
        onClick={handleButtonClick}
      >
        <img src={add} alt="Add" />
        <p>Order</p>
      </div>
      <dialog ref={modalRef}>
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Add Order</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="item"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Item
                </label>
                <input
                  required
                  type="text"
                  name="item"
                  id="item"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Price
                </label>
                <input
                  required
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Quantity
                </label>
                <input
                  required
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Order Date (optional)
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={handleButtonClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
