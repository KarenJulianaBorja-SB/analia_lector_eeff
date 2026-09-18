import { useMemo, useState } from "react";
import { AÑOS, CUENTAS_INICIALES } from "../data/estadosFinancieros.js";
import TablaContable from "./TablaContable.jsx";
import ModalAdvertencia from "./ModalAdvertencia.jsx";
import PanelCupos from "./PanelCupos.jsx";
import VisorPDF from "./VisorPDF.jsx";
import "./LectorEstadosFinancieros.css";

const CUPO_INICIAL = {
  calculado: false,
  cupoTotal: 0,
  modelo: "N/A",
  tasa: "N/A",
  plazo: "N/A",
};

export default function LectorEstadosFinancieros() {
  const [cuentas, setCuentas] = useState(CUENTAS_INICIALES);
  const [cupo, setCupo] = useState(CUPO_INICIAL);
  const [calculando, setCalculando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const conteoCeros = useMemo(() => {
    let total = 0;
    for (const cuenta of cuentas) {
      for (const año of AÑOS) {
        if (cuenta.valores[año] === 0) total += 1;
      }
    }
    return total;
  }, [cuentas]);

  const handleCambiarValor = (key, año, nuevoValor) => {
    setCuentas((prev) =>
      prev.map((cuenta) =>
        cuenta.key === key
          ? { ...cuenta, valores: { ...cuenta.valores, [año]: nuevoValor } }
          : cuenta
      )
    );
    setCupo(CUPO_INICIAL);
    setGuardado(false);
  };

  const ejecutarCalculo = () => {
    setCalculando(true);
    const porCuenta = Object.fromEntries(cuentas.map((c) => [c.key, c.valores]));
    setTimeout(() => {
      const patrimonio2025 = porCuenta.totalPatrimonio?.[2025] ?? 0;
      const utilidad2025 = porCuenta.utilidadNeta?.[2025] ?? 0;
      const cupoTotal = Math.round(utilidad2025 * 1.5 + patrimonio2025 * 0.08);
      setCupo({
        calculado: true,
        cupoTotal,
        modelo: "Score Bolívar v1",
        tasa: "1.2% M.V.",
        plazo: "36 meses",
      });
      setCalculando(false);
    }, 600);
  };

  const ejecutarGuardado = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 4000);
  };

  const solicitarAccion = (accion) => {
    if (conteoCeros > 0) {
      setPendingAction(accion);
      return;
    }
    if (accion === "calcular") ejecutarCalculo();
    if (accion === "guardar") ejecutarGuardado();
  };

  const confirmarPendiente = () => {
    if (pendingAction === "calcular") ejecutarCalculo();
    if (pendingAction === "guardar") ejecutarGuardado();
    setPendingAction(null);
  };

  return (
    <div className="lector-eeff">
      <header className="lector-eeff__header">
        <div>
          <span className="marca">ANALIA · Seguros Bolívar</span>
          <h1>Lector de Estados Financieros</h1>
        </div>
        <div className="lector-eeff__resumen-ceros">
          {conteoCeros > 0 ? (
            <span className="chip chip--alerta">{conteoCeros} campos en $0</span>
          ) : (
            <span className="chip chip--ok">Sin campos pendientes</span>
          )}
        </div>
      </header>

      <div className="lector-eeff__layout">
        <section className="lector-eeff__columna-principal">
          <div className="tarjeta">
            <div className="tarjeta__header">
              <h2>Tabla contable comparativa</h2>
              <p>Haz clic en cualquier valor para editarlo. Los campos sin dato se muestran como 0.</p>
            </div>
            <TablaContable cuentas={cuentas} onCambiarValor={handleCambiarValor} />
          </div>

          <div className="tarjeta">
            <PanelCupos
              cupo={cupo}
              calculando={calculando}
              guardado={guardado}
              onCalcular={() => solicitarAccion("calcular")}
              onGuardar={() => solicitarAccion("guardar")}
            />
          </div>
        </section>

        <aside className="lector-eeff__columna-lateral">
          <div className="tarjeta tarjeta--visor">
            <VisorPDF />
          </div>
        </aside>
      </div>

      <ModalAdvertencia
        abierto={pendingAction !== null}
        camposEnCero={conteoCeros}
        onCancelar={() => setPendingAction(null)}
        onContinuar={confirmarPendiente}
      />
    </div>
  );
}
