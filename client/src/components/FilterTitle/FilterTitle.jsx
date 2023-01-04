import React from "react";
import { useSelector } from "react-redux";
import style from "../FilterTitle/FilterTitle.module.css";

export default function FilterTitle() {
  const estadoFilter = useSelector((state) => state.nameFilter);
  return (
    <div className={style.filtro}>
      {estadoFilter ? (
        <div className={style.h}>
          <h2> Selected order:</h2>{" "}
          <h1> {estadoFilter === "choose" ? null : estadoFilter}</h1>
        </div>
      ) : null}
    </div>
  );
}
