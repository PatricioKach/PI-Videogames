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
          <h1 className={style.tit}>{estadoGame?.name} </h1>
          <div className={style.nonTitle}>
            <img
              src={estadoGame?.image}
              alt={estadoGame?.id}
              className={style.image}
            />
            <div className={style.text}>
              <div className={style.nonDescription}>
                <div>
                  <h2> Released---------------- </h2>
                  <br />
                  {estadoGame?.released}
                </div>
                <div>
                  <h2> Rating </h2>
                  <br />
                  {estadoGame?.rating}
                </div>
                <div>
                  <h2>Plataforms </h2>
                  <br />
                  {estadoGame?.platforms}
                </div>
              </div>
              <div>
                <h2> Description</h2> <br />
                {estadoGame?.description}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
