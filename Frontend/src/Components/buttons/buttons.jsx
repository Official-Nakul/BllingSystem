import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./buttons.css";
import search from "/search.svg";

export const StatusBtn = ({ value, size }) => {
  const [status, setStatus] = useState(value);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div
      className={`flex btn-status-${size} justify-center items-center cursor-pointer ${
        status === "Pending" ? "bg-red-300" : "bg-green-300"
      }`}
    >
      <select
        name="status"
        value={status}
        onChange={handleChange}
        className="bg-transparent cursor-pointer"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export const BillBtn = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Invoice/:id"); // Update the path as needed
  };

  return (
    <div
      className="flex justify-center items-center btn-bill cursor-pointer"
      onClick={handleButtonClick}
    >
      Generate Bill
    </div>
  );
};

export const SearchBar = ({ searchfn }) => {
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    searchfn(searchVal);
  }, [searchVal, search]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
  };

  return (
    <>
      <div className=" flex justify-center items-center gap-2 searchbar cursor-pointer">
        <img src={search} alt="" />
        <input
          type="text"
          className=" bg-transparent"
          placeholder="Search here"
          onChange={handleChange}
          value={searchVal}
        />
      </div>
    </>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const NameCard = ({ name, size }) => {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  return (
    <div
      className={`name-card-${size} flex justify-center items-center`}
      style={{ backgroundColor: bgColor }}
    >
      <p>{name.charAt(0).toUpperCase()}</p>
    </div>
  );
};
