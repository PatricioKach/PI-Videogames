import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <img src="landing-image.jpg" />
      <Link to="/app">
        <h3>uwu</h3>
      </Link>
    </div>
  );
}
