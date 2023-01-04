import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.land}>
      <div className={style.image} />
      <Link to="/app">
        <h3 className={style.goHome}>Home</h3>
      </Link>
    </div>
  );
}
