import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  filterVideogameAlph,
  getVideogames,
  filterByGenre,
  filterByUbication,
  getVideogamesByName,
} from "../../redux/actions";
import style from "./Filter.module.css";
import recargar from "../../assets/recargar-nb.png";
import lupa from "../../assets/lupa-orange.png";

export default function Filter({ setCurrentPage }) {
  const estadoGenres = useSelector((state) => state.genres);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getVideogames());
  };

  const handleChangeGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  };
  const handleChangeAlph = (e) => {
    dispatch(filterVideogameAlph(e.target.value));
  };
  const handleChangeUbi = (e) => {
    dispatch(filterByUbication(e.target.value));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(search));
    setSearch("");
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {/* <p className={style.nameCont}>Filters</p> */}
      <Link to="/app">
        <button className="buttNav" onClick={(e) => handleClick(e)}>
          Recharge videogames
          <img src={recargar} className={style.buttImg} />
        </button>
      </Link>
      <Link to="/app/create">
        <button className="buttNav"> Create new game!</button>
      </Link>

      <div className={style.contFilter}>
        <section className="sec-filter">
          <header>Genres</header>
          <select onChange={(e) => handleChangeGenre(e)} className="sel-filter">
            <option value="choose">--Choose and option--</option>
            {estadoGenres?.map((e) => {
              return (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </section>
        <section className="sec-filter">
          <header>Alphabetical order</header>
          <select onChange={(e) => handleChangeAlph(e)} className="sel-filter">
            <option value="choose">--Choose and option--</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </section>
        <section className="sec-filter">
          <header>Ubication</header>
          <select onChange={(e) => handleChangeUbi(e)} className="sel-filter">
            <option value="choose">--Choose and option--</option>
            <option value="existing">Existing</option>
            <option value="created">Created</option>
          </select>
        </section>
      </div>
      {/* /////////////////////////////// */}
      <section className="sec-filter">
        <header>
          Search by name{" "}
          <img src={lupa} style={{ height: "20px", width: "20px" }} />
        </header>
        <form onSubmit={handleSubmit}>
          <input
            className={style.formBox}
            type="text"
            value={search}
            onChange={handleChange}
          />
          <input type="submit" className={style.formButt} />
        </form>
      </section>
    </div>
  );
}
