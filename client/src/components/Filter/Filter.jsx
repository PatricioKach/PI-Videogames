import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  filterVideogameAlph,
  getVideogames,
  filterByGenre,
  filterByUbication,
} from "../../redux/actions";
import style from "./Filter.module.css";

export default function Filter() {
  const estadoGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getVideogames());
  };

  const handleChangeGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
  };
  const handleChangeAlph = (e) => {
    dispatch(filterVideogameAlph(e.target.value));
  };
  const handleChangeUbi = (e) => {
    dispatch(filterByUbication(e.target.value));
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <p>Filters</p>

      <section>
        <header>Genres</header>
        <div>
          <select onChange={(e) => handleChangeGenre(e)}>
            <option value="choose">--Choose and option--</option>
            {estadoGenres?.map((e) => {
              return (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section>
        <header>Alphabetical order</header>
        <select onChange={(e) => handleChangeAlph(e)}>
          <option value="choose">--Choose and option--</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </section>
      <section>
        <header>Ubication</header>
        <select onChange={(e) => handleChangeUbi(e)}>
          <option value="choose">--Choose and option--</option>
          <option value="existing">Existing</option>
          <option value="created">Created</option>
        </select>
      </section>

      <button className={style.recharge} onClick={(e) => handleClick(e)}>
        {" "}
        <Link to="/app">Recharge videogames</Link>
      </button>
    </div>
  );
}
