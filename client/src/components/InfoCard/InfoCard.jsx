import React from "react";
import style from "../InfoCard/InfoCard.module.css";
import { Link } from "react-router-dom";

export default function InfoCard({ name, image, genres, alt, released, id }) {
  return (
    <div className={style.detailContainer}>
      <Link className={style.hiper} to={`/app/gameDetail/${id}`}>
        <h2>{name}</h2>
      </Link>
      <Link to={`/app/gameDetail/${id}`}>
        <img src={image} alt={alt} className={style.image} />
      </Link>
      <article>
        <b>Genres:</b> <br />
        {genres}
      </article>
      <article>
        <b> Released:</b> <br /> {released}
      </article>
    </div>
  );
}
