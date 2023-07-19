import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../App.css";
import "./login.css";

// import Navbar from "../../components/navbar/Navbar";
import { logInAction } from "../../redux/actions/userAction";

const Login = () => {
  const [input, setInput] = useState({});
  const [errorText, setErrorText] = useState("");
  const [isLoginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInput({ ...input, [name]: value });
    // console.log("============");
    // console.log("input:", input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError(false);
    const response = dispatch(logInAction(input));
    response.then((res) => {
      // console.log(res);
      if (typeof res == "object" && res.response.status == 404) {
        setLoginError(true);
        setErrorText(res.response.statusText);
      }
      if (typeof res == "boolean") {
        if (res) {
          navigate("/");
        } else {
          setLoginError(true);
          setErrorText("This user is not admin");
        }
      }
    });
  };

  return (
    <section>
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body p-4">
            <h1 className="text-center login__title">Login</h1>
            <form className="d-grid gap-3">
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                onChange={handleChange}
                value={input.email}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
                onChange={handleChange}
                value={input.password}
              />
              {isLoginError && <span className="text-danger">{errorText}</span>}
              <button
                onClick={handleSubmit}
                type="button"
                className="rounded login__button"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
