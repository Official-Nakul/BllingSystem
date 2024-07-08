import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./Components/DashBoard/DashBoard";
import CustomerDetail from "./Components/CustomerDetail/CustomerDetail";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/customers") // Replace with your API endpoint
      .then((response) => {
        setData([...response.data]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<DashBoard customerData={data} />} />
          <Route path="/customer/:id" element={<CustomerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
