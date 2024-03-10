import React, { useState } from "react";
import "./CustomGameButtons.scss";
import { useDebounce } from "use-debounce";

const CustomGameButtons = ({ setTitulo, setGameStarted, respuestas, respuestaCorrecta }) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [correcto, setCorrecto] = useState(false);
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);
  const [resuelto, setResuelto] = useState(false);

  const [resolve] = useDebounce(resuelto, 2000);

  /*
   Método para verificar respuesta, modificamos la variable del useDebounce
   que tarda dos segundos en lanzar el useEffect que reinica el juego
   */
  const verificarRespuesta = () => {
    if (respuestaSeleccionada === respuestaCorrecta) {
      setTitulo(respuestaCorrecta);
      setCorrecto(true);
      setResuelto(!resuelto);
    }
  };

  /*
  Seleccionar botón. Cambiar el estilo y settear la variable respuesta para hacer luego la comprobacion.
  */
  const seleccionarOpcion = (respuesta, botonId) => {
    setRespuestaSeleccionada(respuesta);
    setBotonSeleccionado(botonId);
    setCorrecto(false);
  };

  /*
  Reiniciar el juego y el estilo de los componentes.
  */
  React.useEffect(() => {
    setGameStarted(false);
    setTitulo("???????????");
    setBotonSeleccionado(-1);
    setCorrecto(false);
  }, [resolve]);

  const reset = () => {
    setBotonSeleccionado(-1);
    setCorrecto(false);
    setGameStarted(false);
  }

  return (
    <div className="quiz">
      <div className="quiz__answers">
        {respuestas.sort().map((respuesta, index) => (
          <button className="quiz__btn--answer" disabled={correcto} key={index} onClick={() => seleccionarOpcion(respuesta, index)} style={{ backgroundColor: !correcto ? (botonSeleccionado === index ? "#EC9F57" : "#FFF") : botonSeleccionado === index ? "#4BFF1B" : "#fff", color: botonSeleccionado === index ? "#fff" : "#000", border: botonSeleccionado === index ? 0 : "thin solid black" }}>
            {respuesta}
          </button>
        ))}
      </div>
      <div className="quiz__actions">
        <button className="quiz__btn" onClick={() => reset()}>
          Resetear
        </button>
        <button className="quiz__btn-verify" onClick={verificarRespuesta}>
          Verificar
        </button>
      </div>
    </div>
  );
};

export default CustomGameButtons;
