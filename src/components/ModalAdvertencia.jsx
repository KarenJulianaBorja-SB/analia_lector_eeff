export default function ModalAdvertencia({ abierto, camposEnCero, onCancelar, onContinuar }) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onCancelar}>
      <div
        className="modal-caja"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icono">!</div>
        <h2 id="modal-titulo">¿Deseas continuar?</h2>
        <p>
          Hay <strong>{camposEnCero}</strong> campo{camposEnCero === 1 ? "" : "s"} financiero
          {camposEnCero === 1 ? "" : "s"} con valor $0.
        </p>
        <div className="modal-acciones">
          <button type="button" className="btn btn-secundario" onClick={onCancelar}>
            Revisar de nuevo
          </button>
          <button type="button" className="btn btn-primario" onClick={onContinuar}>
            Continuar de todos modos
          </button>
        </div>
      </div>
    </div>
  );
}
