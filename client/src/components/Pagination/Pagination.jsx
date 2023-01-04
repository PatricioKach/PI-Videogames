import React from "react";
import style from "../Pagination/Pagination.module.css";

export default function Pagination({
  videogamesPerPage,
  estadoGames,
  handleSetPage,
  currentPage,
}) {
  const numbers = [];
  const limit = Math.ceil(estadoGames.length / videogamesPerPage);
  for (let i = 1; i <= limit; i++) {
    numbers.push(i);
  }

  return (
    <div className={style.pag}>
      {estadoGames.length !== 0 && (
        <button
          className={style.arrow}
          onClick={() => handleSetPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
      )}
      {numbers.map((e) => (
        <button
          className={currentPage === e ? style.numSelected : style.num}
          key={e}
          onClick={() => handleSetPage(e)}
        >
          {e}
        </button>
      ))}
      {estadoGames.length !== 0 && (
        <button
          className={style.arrow}
          onClick={() => handleSetPage(currentPage + 1)}
          disabled={currentPage === limit}
        >
          →
        </button>
      )}
    </div>
  );
}
