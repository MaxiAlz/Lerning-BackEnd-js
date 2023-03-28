import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const URL_BASE = "http://localhost:8080";

const LoginUser = () => {
  const [userLoged, setUserLoged] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      axios.post(`${URL_BASE}/session/login`, loginUser).then((response) => {
        console.log(response);
        if (response.status == 200) {
          setUserLoged(true);
          alert(`Bienvenido ${response.data.user.username}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGithub = async () => {
    const popup = window.open(
      "http://localhost:8080/session/login-github",
      "targetWindow",
      `toolbar=no,
          location=no,
          status=no,
          menubar=no,
          scrollbars=yes,
          resizable=yes,
          width=620,
          height=700`
    );
    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:8080") {
        if (event.data) {
          localStorage.setItem("user", JSON.stringify(event.data));

          popup?.close();
        }
      }
    });
    // try {
    //   axios.get(`${URL_BASE}/session/login-github`).then((resp) => {
    //     console.log(resp);
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div
      className="container col-4 col-sx-10"
      style={{
        border: "2px solid black",
        borderRadius: "2rem",
        padding: "2rem",
      }}
    >
      <h4 className="mt-2 pb-2">Login</h4>
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
      {!!userLoged && <Navigate to="products" />}
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
      {/* <div>
        <button onClick={handleLoginGithub}>Login con github</button>
      </div> */}
      <div>
        <a href="http://localhost:8080/session/login-github">Login con Github</a>
      </div>
      <div className="d-flex justify-content-between">
        <Link to="/register">
          <button className="btn">Registrarse</button>
        </Link>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
