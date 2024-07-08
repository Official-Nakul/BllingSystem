import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DashBoard.css";
import { CustomerForm } from "../Form/Form";
import { SearchBar, NameCard, StatusBtn, BillBtn } from "../buttons/buttons";
const DashBoard = ({ customerData }) => {
  const [search, setSearch] = useState("");
  const getSearchVal = (searchVal) => {
    setSearch(searchVal);
  };
  console.log(search);
  return (
    <div className="dashboardContainer">
      <div className="searchContainer flex justify-center items-center gap-4">
        <SearchBar searchfn={getSearchVal} />
        <CustomerForm />
      </div>
      {customerData
        .filter((cust) =>
          `${cust.first_name} ${cust.last_name}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((cust, index) => (
          <div className="customer flex justify-between items-center">
            <Link
              key={index}
              to={`/customer/${cust._id}`} // Use cust.id or any unique identifier for your customers
              className="customerContainer flex justify-center items-center"
            >
              <div className="flex justify-center items-center gap-2">
                <NameCard name={cust.first_name} size={"sm"} />
              </div>
              <div className="flex justify-between items-center customerDetails">
                <p>{cust.first_name}</p>
                <p>{cust.last_name}</p>
                <p>{cust.address}</p>
              </div>
            </Link>
            <div className="flex justify-center items-center gap-2">
              <StatusBtn
                // className=" cursor-pointer"
                value={cust.status}
                size={"sm"}
              />
              <Link to={`/invoice/${cust._id}`}>
                <BillBtn />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashBoard;
