import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
  const URL_BASE = "http://localhost:8080";

  const [isUserLoged, setIsUserLoged] = useState(false);
  const [userRegister, setUserRegister] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmitNewUser = async () => {
    try {
      // console.log(userRegister);
      await axios
        .post(`${URL_BASE}/api/users/register-user`, userRegister)
        .then((response) => {
          if (response.status == 201) {
            setIsUserLoged(confirm(`${response.data.user.username}: Su cuenta fue creada!`));
            return;
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (val) => {
  //   try {
  //     axios.post(`${URL_BASE}/api/products`, val).then((response) => {
  //       console.log(response);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className="container col-4  col-sx-10"
      style={{
        border: "2px solid black",
        borderRadius: "2rem",
        padding: "2rem",
      }}
    >
      <h4 className="mt-2 pb-2">Registrarse</h4>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Nombre de usuario
        </label>
        <input
          name="username"
          type="text"
          className="form-control"
          placeholder="Username"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="first_name"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Apellido
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="last_name"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pass" className="form-label">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="pass"
          placeholder="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between">
        <Link to="/">
          <button className="btn"> Iniciar Sesion</button>
        </Link>
        <button
          className="btn btn-primary"
          /*  type="submit" */
          onClick={handleSubmitNewUser}
        >
          Crear Cuenta
        </button>
      </div>
      {isUserLoged ? <Navigate to="/" /> : false}
    </div>
  );
};

export default RegisterUser;
