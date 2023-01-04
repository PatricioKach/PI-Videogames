import React, { useState } from "react";
import { useEffect } from "react";
import InfoCard from "../InfoCard/InfoCard";
import { getVideogames } from "../../redux/actions";
import style from "../Cards/Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import FilterTitle from "../FilterTitle/FilterTitle";

export default function Cards() {
  const estadoGames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  const [videogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  let lastIndex = videogamesPerPage * currentPage;
  let firstIndex = lastIndex - videogamesPerPage;
  let currentVideogame = estadoGames.slice(firstIndex, lastIndex);

  const handleSetPage = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  return (
    <div className={style.cont}>
      <FilterTitle />
      <Pagination
        estadoGames={estadoGames}
        videogamesPerPage={videogamesPerPage}
        handleSetPage={handleSetPage}
        currentPage={currentPage}
      />
      {estadoGames?.length > 0 ? (
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
      ) : (
        <div>No hay juegos </div>
      )}
      <Pagination
        estadoGames={estadoGames}
        videogamesPerPage={videogamesPerPage}
        handleSetPage={handleSetPage}
        currentPage={currentPage}
      />
    </div>
  );
}
