import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";

export const Invoice = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  let today = new Date();

  let year = today.getFullYear(); // Full year (YYYY)
  let month = today.getMonth() + 1; // Month (0-11, so add 1 for 1-12)
  let day = today.getDate(); // Day of the month (1-31)

  // Format it as needed, for example:
  let formattedDate = `${day}/${month}/${year}`;
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
  console.log(customer);
  useEffect(() => {
    if (orders.length > 0) {
      const totalAmount = orders.reduce(
        (sum, order) => sum + order.costPerOrder,
        0
      );
      setTotal(totalAmount);
    }
  }, [orders]);

  const downloadPDF = () => {
    const invoiceElement = document.getElementById("invoice-content");

    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };
  if (!customer || !orders) {
    return <div>Loading...</div>;
  }
  console.log(orders);
  return (
    <>
      <div className="mt-6 flex justify-center gap-x-3">
        <div
          className=" cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          href="#"
          onClick={downloadPDF}
        >
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          Download PDF
        </div>
      </div>
      <div
        id="invoice-content"
        className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10"
      >
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
            <div className="flex justify-between">
              <div>
                <svg
                  className="size-10"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                    className="stroke-blue-600"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                    className="stroke-blue-600"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="13"
                    cy="13.0214"
                    r="5"
                    fill="currentColor"
                    className="fill-blue-600"
                  />
                </svg>

                <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
                  Preline Inc.
                </h1>
              </div>

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">3682303</span>

                <address className="mt-4 not-italic text-gray-800">
                  45 Roker Terrace
                  <br />
                  Latheronwheel
                  <br />
                  KW5 8NW, London
                  <br />
                  United Kingdom
                  <br />
                </address>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  {customer.first_name + " " + customer.last_name}
                </h3>
                <address className="mt-2 not-italic text-gray-500">
                  {customer.address}
                  <br />
                </address>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {formattedDate}
                    </dd>
                  </dl>
                  {/* <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/11/2018</dd>
                  </dl> */}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200"></div>
                {orders.map((order, index) => {
                  return (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div className="col-span-full sm:col-span-2">
                          <p className="font-medium text-gray-800">
                            {order.item}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-800">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-800">{order.price}</p>
                        </div>
                        <div>
                          <p className="sm:text-end text-gray-800">
                            <span>&#8377;</span>
                            {order.costPerOrder}
                          </p>
                        </div>
                      </div>
                      <div className="sm:hidden border-b border-gray-200"></div>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      <span>&#8377;</span>
                      {total}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      <span>&#8377;</span>
                      {total}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Tax:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      <span>&#8377;</span>
                      {(0.18 * total).toPrecision(4)}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500">0</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Due balance:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      <span>&#8377;</span>
                      {parseInt(total) +
                        parseFloat((0.18 * total).toPrecision(4))}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  example@site.com
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  +1 (062) 109-9222
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
          </div>
        </div>
      </div>
    </>
  );
};
