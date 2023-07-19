import { useState } from "react";
import { useSelector } from "react-redux";
import "./navbar.css";

// import LoginButton from "../button/loginButton/LoginButton";
import SignupButton from "../button/signup/SignupButton";
import TransactionButton from "../button/transaction/TransactionButton";
import LoginButton from "../button/login/LoginButton";
import LogoutButton from "../button/logout/LogoutButton";

const Navbar = () => {
  const user = useSelector((state) => state.user.loginUser);

  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="/" className="logo">
          Booking Website
        </a>
        {user.email ? (
          <div className="d-flex align-items-center">
            <span>{user.username}</span>
            <TransactionButton />
            <LogoutButton />
          </div>
        ) : (
          <div className="navItems">
            <LoginButton />
            <SignupButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
