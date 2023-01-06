import React from "react";
import { useSelector } from "react-redux";
import style from "../FilterTitle/FilterTitle.module.css";

export default function FilterTitle() {
  const estadoFilter = useSelector((state) => state.nameFilter);
  return (
    <div className={style.filtro}>
      {estadoFilter ? (
        <div className={style.h}>
          <span> Selected order:</span>
          <span className={style.nameFilt}>
            {estadoFilter === "choose" ? null : estadoFilter}
          </span>
        </div>
      ) : null}
    </div>
  );
}
