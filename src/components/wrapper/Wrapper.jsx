import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

import "../../App.css";
import "./wrapper.css";

const Wrapper = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.loginUser);
  if (!user) {
    navigate("/login");
  }

  return (
    <section className="pt-3 app__container">
      <section className="row d-flex">
        <div className="col-2 border-secondary border-end border-bottom p-1 text-center fw-bold">
          <span className="purple-text">Admin Page</span>
        </div>
        <div className="col-10 border-secondary border-start border-bottom"></div>
      </section>
      <section className="row d-flex h-90">
        <div className="col-2 border-secondary border-end border-top ">
          <Sidebar />
        </div>
        <div className="col-10 border-secondary border-start border-top">
          {props.children}
        </div>
      </section>
    </section>
  );
};

export default Wrapper;
