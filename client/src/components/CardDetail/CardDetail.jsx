import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../Error/Error.jsx";
import { getVideogameByID } from "../../redux/actions.js";
import style from "../CardDetail/CardDetail.module.css";
import Loading from "../Loading/Loading";

export default function CardDetail() {
  const estadoGame = useSelector((state) => state.videogameDetail);
  const load = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogameByID(id));
  }, []);

  return (
    <div className={style.cont}>
      {load ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
