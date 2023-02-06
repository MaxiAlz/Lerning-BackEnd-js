import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import * as Icon from "react-bootstrap-icons";
import { PencilSquare, PlusLg, Trash } from "react-bootstrap-icons";
import Pagination from "./Pagination";

const URL_BASE = "http://localhost:8080";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [paginateOptions, setPaginateOptions] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios
        .get(`${URL_BASE}/api/products`)
        .then((response) => {
          setPaginateOptions(response.data.options);
          setProducts(response.data.payload);
          return response;
        });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();

    return () => {};
  }, []);

  // const populateProducts = async () => {
  //   const { payload, options } = await getProducts();
  //   setProducts(payload);
  //   setPaginateOptions(options);
  // };

  // useEffect(async () => {
  //   await populateProducts();
  //   return;
  // }, []);
  // console.log(paginateOptions);

  const handleClickEdit = (rowData) => {
    console.log(rowData);
  };
  const handleClickDeleteProduct = (rowData) => {
    console.log(rowData);
  };
  const handleClickAddProduct = (rowData) => {
    console.log(rowData);
  };


  console.log(paginateOptions);

  return (
    <div className={"container"}>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mt-4 mb-4 container">Lista de Productos</h3>
        {paginateOptions ? (
          <Pagination paginateOptions={paginateOptions} />
        ) : null}
      </div>
      <table className="table table-striped container">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="col-1 fw-semibold">
              TITULO
            </th>
            <th scope="col" className="col-1">
              PRECIO
            </th>
            <th scope="col" className="col-3">
              DESCRIPCION
            </th>
            <th scope="col">STOCK</th>
            <th scope="col">IMAGEN</th>
            <th scope="col">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td className="fw-semibold">{prod.tittle}</td>
              <td>
                <span className="fw-semibold">U$S: </span> {prod.price}
              </td>
              <td>{prod.description}</td>
              <td>{prod.stock} Unidades</td>
              <td>
                <img
                  src={prod.thumbnail}
                  alt={prod.tittle}
                  height="72px"
                  width="72px"
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary  m-1"
                  onClick={() => handleClickEdit(prod)}
                >
                  {/* {console.log(prod)} */}
                  <PencilSquare />
                </button>
                <button
                  onClick={() => handleClickDeleteProduct(prod)}
                  type="button"
                  className="btn btn-secondary  m-1"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => handleClickAddProduct(prod)}
                  type="button"
                  className="btn btn-secondary  m-1"
                >
                  <PlusLg />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
