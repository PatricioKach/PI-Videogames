import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../Nav/Nav.module.css";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";

export default function Nav() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(search));
    setSearch("");
  }

  return (
    <div className={style.container}>
      <Link to="/app">Home </Link>
      <Link to="/app">
        <img src="logo.png" alt="logo" className={style.logo} />
      </Link>
      <div className={style.actions}>
        <div className={style.allActions}>
          <p>Create new game!</p>
          <Link to="/app/create">Click here!</Link>
        </div>
        <div className={style.formu}>
          <p>Search by name</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="Busque"
              value={search}
              onChange={handleChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
