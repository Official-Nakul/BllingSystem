import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { NameCard, StatusBtn, BillBtn } from "../buttons/buttons";
import { OrderForm } from "../Form/Form";
import "./CustomerDetail.css";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pendingAmt, setPendingAmt] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
      });

    axios
      .get(`/api/orders/${id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders data!", error);
      });
  }, [id]);

  useEffect(() => {
    if (orders.length > 0) {
      const totalPending = orders.reduce(
        (sum, order) => sum + order.costPerOrder,
        0
      );
      setPendingAmt(totalPending);
    }
  }, [orders]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <NameCard name={customer.first_name} size={"l"} />
          <div className="flex flex-col justify-center items-center mr-auto ml-12 self-start">
            <div className="flex justify-center items-center text-lg font-medium gap-2 self-start">
              <p>{customer.first_name}</p>
              <p>{customer.last_name}</p>
            </div>
            <p className="text-lg font-medium self-start">{customer.number}</p>
            <p className="text-lg font-medium self-start">{customer.address}</p>
          </div>

          <div className="flex flex-col justify-center items-center mr-auto gap-2">
            <div className=" w-64 flex justify-between items-center text-lg font-medium">
              <p>Amount pending: </p>
              <p>{pendingAmt}</p>
            </div>
            <div className=" w-64 flex justify-between items-center text-lg font-medium">
              <p>Amount recived: </p>
              <p>{customer.amountRecived}</p>
            </div>
            <div className=" border-t-2 border-dashed border-black w-64 flex justify-between items-center text-lg font-medium">
              <p>Remaing: </p>
              <p>{pendingAmt - customer.amountRecived}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 ">
            <StatusBtn value={customer.status} size={"xl"} />
            <div className=" flex justify-center items-center gap-6">
              <Link to={`/invoice/${customer._id}`}>
                <BillBtn />
              </Link>
              <OrderForm customer={customer} />
            </div>
          </div>
        </div>
        <div className="orderTableContainer font-medium text-xl gap-2">
          <table className="orderTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const date = new Date(order.order_date);

                const year = date.getUTCFullYear();
                const month = date.getUTCMonth() + 1; // Months are zero-indexed
                const day = date.getUTCDate();
                const dispDate = day + "-" + month + "-" + year;
                return (
                  <tr key={index}>
                    <td>{dispDate}</td>
                    <td>{order.item || "abc"}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.costPerOrder}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
