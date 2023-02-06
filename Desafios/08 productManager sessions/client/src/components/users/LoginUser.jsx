import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

const URL_BASE = "http://localhost:8080";

const LoginUser = () => {
  const [userLoged, setUserLoged] = useState(false)
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
      axios.post(`${URL_BASE}/api/users/login`, loginUser).then((response) => {
        console.log(response);
        if(response.status == 200){
          setUserLoged(true)
          alert(`Bienvenido ${response.data.user.username}`)
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      {userLoged ? <Navigate to='products'/> : false}
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
        <Link to="/register">
          <button className="btn">Registrarse</button>
        </Link>
        <button className="btn btn-primary" onClick={handleSubmit}>Ingresar</button>
      </div>
    </div>
  );
};

export default LoginUser;
