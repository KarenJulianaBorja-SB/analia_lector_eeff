import { useEffect, useRef, useState } from "react";

function formatearCOP(valor) {
  return valor.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}

function parsearEntrada(texto) {
  const limpio = texto.replace(/[^\d-]/g, "");
  if (limpio === "" || limpio === "-") return 0;
  const numero = parseInt(limpio, 10);
  return Number.isNaN(numero) ? 0 : numero;
}

export default function CeldaEditable({ valor, onCambiar, destacado }) {
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState(String(valor));
  const inputRef = useRef(null);

  useEffect(() => {
    if (editando && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editando]);

  const iniciarEdicion = () => {
    setBorrador(valor === 0 ? "" : String(valor));
    setEditando(true);
  };

  const confirmar = () => {
    onCambiar(parsearEntrada(borrador));
    setEditando(false);
  };

  const cancelar = () => {
    setEditando(false);
  };

  if (editando) {
    return (
      <input
        ref={inputRef}
        className="celda-input"
        value={borrador}
        onChange={(e) => setBorrador(e.target.value)}
        onBlur={confirmar}
        onKeyDown={(e) => {
          if (e.key === "Enter") confirmar();
          if (e.key === "Escape") cancelar();
        }}
        inputMode="numeric"
      />
    );
  }

  const esCero = valor === 0;

  return (
    <button
      type="button"
      className={
        "celda-valor" +
        (destacado ? " celda-valor--destacado" : "") +
        (esCero ? " celda-valor--cero" : "")
      }
      onClick={iniciarEdicion}
      title="Clic para editar"
    >
      {esCero ? "0" : `$${formatearCOP(valor)}`}
      {esCero && <span className="punto-alerta" aria-hidden="true" />}
    </button>
  );
}
