import { AÑOS } from "../data/estadosFinancieros.js";
import CeldaEditable from "./CeldaEditable.jsx";

export default function TablaContable({ cuentas, onCambiarValor }) {
  return (
    <div className="tabla-contable-wrapper">
      <table className="tabla-contable">
        <thead>
          <tr>
            <th className="col-cuenta">Cuenta</th>
            {AÑOS.map((año) => (
              <th key={año} className="col-anio">
                {año}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cuentas.map((cuenta) => (
            <tr key={cuenta.key} className={cuenta.destacado ? "fila-destacada" : undefined}>
              <td className="col-cuenta">{cuenta.label}</td>
              {AÑOS.map((año) => (
                <td key={año} className="col-anio">
                  <CeldaEditable
                    valor={cuenta.valores[año]}
                    destacado={cuenta.destacado}
                    onCambiar={(nuevoValor) => onCambiarValor(cuenta.key, año, nuevoValor)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
