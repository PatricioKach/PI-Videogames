import React from "react";
import style from "../InfoCard/InfoCard.module.css";
import { Link } from "react-router-dom";

export default function InfoCard({ name, image, genres, alt, released, id }) {
  return (
    <Link className={style.hiper} to={`/app/gameDetail/${id}`}>
      <div className={style.detailContainer}>
        <div className={style.tit}>
          <h2>{name}</h2>
        </div>
        <div className={style.imageContainer}>
          <div
            alt={alt}
            className={style.image}
            style={{ backgroundImage: `url("${image}")` }}
          />
        </div>
        <div>
          <article>
            <b>Genres:</b> <br />
            {genres}
          </article>
          <article>
            <b> Released:</b> <br /> {released}
          </article>
        </div>
      </div>
    </Link>
  );
}
