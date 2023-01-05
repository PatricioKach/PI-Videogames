import React from "react";
import { Link } from "react-router-dom";
import style from "../Nav/Nav.module.css";

export default function Nav() {
  return (
    <div className={style.container}>
      <Link to="/app">
        <h3 className={style.goHome}>Home</h3>
      </Link>
      <Link to="/app">
        <img src="logo.png" alt="logo" className={style.logo} />
      </Link>
    </div>
  );
}
