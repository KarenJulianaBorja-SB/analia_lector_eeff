function formatearMoneda(valor) {
  return `$${valor.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
}

export default function PanelCupos({ cupo, calculando, onCalcular, onGuardar, guardado }) {
  return (
    <div className="panel-cupos">
      <div className="panel-cupos__header">
        <h3>Panel de Cupos</h3>
        <span className={"estado-badge" + (cupo.calculado ? " estado-badge--ok" : "")}>
          {cupo.calculado ? "Calculado" : "Pendiente"}
        </span>
      </div>

      <div className="panel-cupos__grid">
        <div className="metrica metrica--principal">
          <span className="metrica__label">Cupo Total</span>
          <span className="metrica__valor">{formatearMoneda(cupo.cupoTotal)}</span>
        </div>
        <div className="metrica">
          <span className="metrica__label">Modelo</span>
          <span className="metrica__valor">{cupo.modelo}</span>
        </div>
        <div className="metrica">
          <span className="metrica__label">Tasa sugerida</span>
          <span className="metrica__valor">{cupo.tasa}</span>
        </div>
        <div className="metrica">
          <span className="metrica__label">Plazo sugerido</span>
          <span className="metrica__valor">{cupo.plazo}</span>
        </div>
      </div>

      <div className="panel-cupos__acciones">
        <button type="button" className="btn btn-secundario" onClick={onCalcular} disabled={calculando}>
          {calculando ? "Calculando…" : "Calcular Cupo"}
        </button>
        <button type="button" className="btn btn-primario" onClick={onGuardar}>
          Guardar Final
        </button>
      </div>

      {guardado && <div className="toast-exito">Estados financieros guardados correctamente.</div>}
    </div>
  );
}
