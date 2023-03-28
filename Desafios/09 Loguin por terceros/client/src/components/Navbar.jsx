import axios from "axios";
import React from "react";

const URL_BASE = "http://localhost:8080";

export const Navbar = () => {
  const handleLogout = async () => {
    try {
      axios.post(`${URL_BASE}/session/logout`).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar bg-body-tertiary p-3 mb-5" data-bs-theme="dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Product Manager</span>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
