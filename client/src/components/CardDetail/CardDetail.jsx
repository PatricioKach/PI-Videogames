import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameByID } from "../../redux/actions.js";
import style from "../CardDetail/CardDetail.module.css";

export default function CardDetail() {
  const estadoGame = useSelector((state) => state.videogameDetail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogameByID(id));
  }, []);

  return (
    <div className={style.cont}>
      <h1>{estadoGame?.name} </h1>
      <img src={estadoGame?.image} alt={estadoGame?.id} />
      <div>
        <b> Description</b> <br />
        {estadoGame?.description}
      </div>
      <div>
        <b> Released </b>
        <br />
        {estadoGame?.released}
      </div>
      <div>
        <b> Rating </b>
        <br />
        {estadoGame?.rating}
      </div>
      <div>
        <b>Plataforms </b>
        <br />
        {estadoGame?.platforms}
      </div>
    </div>
  );
}
