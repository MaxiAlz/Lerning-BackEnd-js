import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import FormCreateProduct from "./components/FormCreateNewProduct";
import { Navbar } from "./components/Navbar";
import ProductsTable from "./components/ProductTable";
import LoginUser from "./components/users/LoginUser";
import RegisterUser from "./components/users/RegisterUser";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/products" element={<ProductsTable />} />
      </Routes>
      {/* <FormCreateProduct /> */}
      {/* <ProductsTable /> */}
    </div>
  );
}

export default App;
