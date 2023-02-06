import React from "react";
import FormCreateProduct from "./components/FormCreateNewProduct";
import { Navbar } from "./components/Navbar";
import ProductsTable from "./components/ProductTable";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FormCreateProduct />
      <ProductsTable />
    </div>
  );
}

export default App;
