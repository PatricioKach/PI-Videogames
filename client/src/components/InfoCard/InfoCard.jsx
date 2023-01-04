import React from "react";
import style from "../InfoCard/InfoCard.module.css";
import { Link } from "react-router-dom";

export default function InfoCard({ name, image, genres, alt, released, id }) {
  return (
    <div className={style.detailContainer}>
      <h2>{name}</h2>
      <img src={image} alt={alt} className={style.image} />
      <article>
        <b>Genres:</b> <br />
        {genres}
      </article>
      <article>
        <b> Released:</b> <br /> {released}
      </article>
      <Link to={`/app/gameDetail/${id}`}>More details</Link>
    </div>
  );
}
