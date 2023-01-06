import React, { useState } from "react";
import { useEffect } from "react";
import { getVideogames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../InfoCard/InfoCard";
import Pagination from "../Pagination/Pagination";
import FilterTitle from "../FilterTitle/FilterTitle";
import Loading from "../Loading/Loading";
import style from "../Cards/Cards.module.css";
import Filter from "../Filter/Filter";
import Error from "../../Error/Error";

export default function Cards() {
  const estadoGames = useSelector((state) => state.videogames);
  const load = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [videogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  let lastIndex = videogamesPerPage * currentPage;
  let firstIndex = lastIndex - videogamesPerPage;
  let currentVideogame = estadoGames.slice(firstIndex, lastIndex);

  const handleSetPage = (num) => {
    setCurrentPage(num);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  return (
    <div className={style.cont}>
      <Filter setCurrentPage={setCurrentPage} />
      {load ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : error ? (
        <Error />
      ) : (
        <>
          <FilterTitle />
          <Pagination
            estadoGames={estadoGames}
            videogamesPerPage={videogamesPerPage}
            handleSetPage={handleSetPage}
            currentPage={currentPage}
          />
          {
            <div className={style.contenedor}>
              {currentVideogame.map((e, i) => {
                return (
                  <div key={`${e.id}-${i}`}>
                    <InfoCard
                      name={e.name}
                      image={e.image}
                      genres={e.genres}
                      alt={e.id}
                      released={e.released}
                      id={e.id}
                    />
                  </div>
                );
              })}
            </div>
          }
          <Pagination
            estadoGames={estadoGames}
            videogamesPerPage={videogamesPerPage}
            handleSetPage={handleSetPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}
