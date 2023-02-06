import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const URL_BASE = "http://localhost:8080";
const FormCreateProduct = () => {
  const options = [
    "computer",
    "watchs",
    "cellPhones",
    "electrodomestics",
    "transports",
    "speakers",
    "otros",
  ];
  // const [initialValues, setInitialValues] = useState({
  //   tittle: "",
  //   category: "",
  //   price: "",
  //   thumbnail: "",
  //   code: "",
  //   stock: "",
  //   description: "",
  // });
  const initialValues = {
    tittle: "",
    category: "",
    price: "",
    thumbnail: "",
    code: "",
    stock: "",
    description: "",
  };

  const handleSubmit = async (val) => {
    try {
      axios
        .post(`${URL_BASE}/api/products`, val)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const validate = ({
    tittle,
    category,
    price,
    thumbnail,
    code,
    stock,
    description,
  }) => {
    const errors = {};

    if (!tittle) {
      errors.tittle = "*Requerido";
    }
    if (category == "Elegir Categoria") {
      errors.category = "*Elegir Categoria";
    }
    if (!price) {
      errors.price = "*Requerido";
    }
    if (!thumbnail) {
      errors.thumbnail = "*Requerido";
    }
    if (!stock) {
      errors.stock = "*Requerido";
    }
    if (!code) {
      errors.code = "*Requerido";
    }
    if (!description) {
      errors.description = "*Requerido";
    }

    return errors;
  };

  return (
    <div className="container">
      <h3>Crear Producto Producto</h3>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="tittle" className="form-label">
                Nombre del Producto
              </label>
              <Field
                type="text"
                name="tittle"
                className="form-control"
                placeholder="MacBook Pro"
              />
              <ErrorMessage name="tittle" />
            </div>
            <div className="col-md-4">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                className="form-select col-3"
                name="category"
                onChange={(e) => {
                  initialValues.category = e.target.value;
                  console.log(e.target.value);
                }}
              >
                <option selected>Elegir Categoria</option>
                {options.map((opt) => (
                  <option /*  value={opt} */ key={opt}>{opt}</option>
                ))}
              </select>
              <ErrorMessage name="category" />
            </div>
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <Field
                type="number"
                className="form-control"
                name="price"
                placeholder="U$S"
              />
              <ErrorMessage name="price" />
            </div>
            <div className="col-md-4">
              <label htmlFor="thumbnail" className="form-label">
                Url Imagen
              </label>
              <Field
                type="text"
                className="form-control"
                name="thumbnail"
                placeholder="https:/imagen.com/"
              />
              <ErrorMessage name="thumbnail" />
            </div>
            <div className="col-md-4">
              <label htmlFor="code" className="form-label">
                Codigo Identificacion
              </label>
              <Field
                type="text"
                className="form-control"
                name="code"
                maxLength={6}
                placeholder="CMP123"
              />
              <ErrorMessage name="code" />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">
                Stock Disponible
              </label>
              <Field
                type="number"
                className="form-control"
                name="stock"
                defaultValue={10}
              />
              <ErrorMessage name="stock" />
            </div>
            <div className="col-md-12">
              <label htmlFor="description" className="form-label">
                Descripcion
              </label>
              <Field
                type="text"
                className="form-control"
                name="description"
                placeholder="Computadora Apple"
              />
              <ErrorMessage name="description" />
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-dark">
                Crear Producto
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormCreateProduct;
