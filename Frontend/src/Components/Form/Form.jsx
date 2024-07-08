import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import add from "/add.svg";

export const CustomerForm = () => {
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
        {/* <img src={add} alt="Close"  /> */}
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Add Customer</h1>
          <form>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter first name"
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
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter last name"
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
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter address"
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
                  type="text"
                  name="mobilenumber"
                  id="mobilenumber"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter mobile"
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
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={handleButtonClick}
              >
                Cancel
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      </dialog>
    </>
  );
};
export const OrderForm = () => {
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
        {/* <img src={add} alt="Close"  /> */}
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Add Order</h1>
          <form>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="item"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Item
                </label>
                <input
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
                  type="text"
                  name="Price"
                  id="Price"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter Price"
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
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={handleButtonClick}
              >
                Cancel
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      </dialog>
    </>
  );
};
