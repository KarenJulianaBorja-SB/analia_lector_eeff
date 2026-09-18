import React, { useState } from "react";
import { 
  FileSpreadsheet, Download, AlertTriangle, 
  FileText, ShieldCheck, ArrowLeft, UploadCloud, CheckCircle2 
} from "lucide-react";

const DATOS_INICIALES = [
  { id: 1, cuenta: "efectivo", y2025: 1000000, y2024: 1000000, esTotal: false },
  { id: 2, cuenta: "activo corriente", y2025: 4858837, y2024: 2000000, esTotal: false },
  { id: 3, cuenta: "activo no corriente", y2025: 3800000, y2024: 3800000, esTotal: false },
  { id: 4, cuenta: "total activo", y2025: 8658837, y2024: 5800000, esTotal: true },
  { id: 5, cuenta: "pasivo corriente", y2025: 1383000, y2024: 644140, esTotal: false },
  { id: 6, cuenta: "obligaciones cp", y2025: 0, y2024: 0, esTotal: false },
  { id: 7, cuenta: "obligaciones lp", y2025: 0, y2024: 0, esTotal: false },
  { id: 8, cuenta: "total pasivo", y2025: 1383000, y2024: 644140, esTotal: true },
  { id: 9, cuenta: "total patrimonio", y2025: 7275837, y2024: 5155860, esTotal: true },
  { id: 10, cuenta: "reservas", y2025: 0, y2024: 0, esTotal: false },
  { id: 11, cuenta: "ingresos operacionales", y2025: 0, y2024: 0, esTotal: false },
  { id: 12, cuenta: "costos ventas", y2025: 0, y2024: 0, esTotal: false },
  { id: 13, cuenta: "utilidad operacional", y2025: 0, y2024: 0, esTotal: false },
  { id: 14, cuenta: "gastos financieros", y2025: 0, y2024: 0, esTotal: false },
  { id: 15, cuenta: "depreciacion", y2025: 0, y2024: 0, esTotal: false },
  { id: 16, cuenta: "amortizacion", y2025: 0, y2024: 0, esTotal: false },
  { id: 17, cuenta: "impuestos", y2025: 0, y2024: 0, esTotal: false },
  { id: 18, cuenta: "utilidad neta", y2025: 2119977, y2024: 355860, esTotal: true },
  { id: 19, cuenta: "otros ingresos", y2025: 0, y2024: 0, esTotal: false },
  { id: 20, cuenta: "otros egresos", y2025: 0, y2024: 0, esTotal: false },
];

export default function App() {
  const [vista, setVista] = useState("inicio"); // 'inicio' | 'formulario' | 'tabla'
  const [ciuu, setCiuu] = useState("B0810 - Extracción de piedra, arena, arcillas comunes");
  const [poliza, setPoliza] = useState("No");
  const [clasificacion, setClasificacion] = useState("Enfoque");
  const [nombreArchivo, setNombreArchivo] = useState("");

  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cuposCalculados, setCuposCalculados] = useState(false);

  // Manejar selección real de archivo PDF
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNombreArchivo(file.name);
    }
  };

  const handleCellChange = (id, year, value) => {
    const numVal = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    setDatos(prev => prev.map(row => row.id === id ? { ...row, [year]: numVal } : row));
  };

  const solicitarCalculo = () => {
    const tieneCeros = datos.some(r => r.y2025 === 0 || r.y2024 === 0);
    if (tieneCeros) {
      setMostrarModal(true);
    } else {
      setCuposCalculados(true);
    }
  };

  const formatCOP = (val) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(val);

  // --- PASO 1: MENÚ DE SELECCIÓN INICIAL ---
  if (vista === "inicio") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-200">
          <div className="w-16 h-16 bg-[#008B45] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/30">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold block">
            SEGUROS BOLÍVAR
          </span>

          <h1 className="text-3xl font-black text-[#008B45] mt-1 tracking-tight">
            ANALIA
          </h1>

          <p className="text-xs text-slate-500 mt-2 mb-8 font-medium">
            Por favor seleccione el servicio que desea utilizar
          </p>

          <div className="grid grid-cols-3 gap-3">
            <button disabled className="p-3 rounded-2xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed h-20 flex items-center justify-center leading-tight">
              Lector de Contratos
            </button>

            <button 
              onClick={() => setVista("formulario")}
              className="p-3 rounded-2xl bg-[#008B45] hover:bg-[#007037] text-white text-xs font-bold transition transform hover:scale-105 shadow-md shadow-emerald-800/30 h-20 flex items-center justify-center leading-tight"
            >
              Lector de EEFF
            </button>

            <button disabled className="p-3 rounded-2xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed h-20 flex items-center justify-center leading-tight">
              Servicio Integrado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PASO 2: FORMULARIO DE CARGA CON ARCHIVO REAL ---
  if (vista === "formulario") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setVista("inicio")}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
              title="Volver al menú inicial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#008B45] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                Seguros Bolívar <span className="text-[#008B45]">| ANALIA</span>
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Usuario: <span className="font-semibold text-slate-700">karen.juliana.borja@segurosbolivar.com</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl border border-slate-200">
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold block">
                SEGUROS BOLÍVAR
              </span>
              <h2 className="text-2xl font-bold text-[#008B45] mt-1">
                Lector de Estados Financieros
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Por favor selecciona el estado financiero que desea analizar.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Campo CIIU */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">Actividad Económica (CIIU)</label>
                <input 
                  list="opciones-ciuu"
                  type="text" 
                  value={ciuu}
                  onChange={(e) => setCiuu(e.target.value)}
                  placeholder="Selecciona o escribe un código CIIU..."
                  className="w-full px-3 py-2 border border-[#008B45] rounded-xl focus:ring-2 focus:ring-[#008B45] focus:outline-none bg-white font-medium text-slate-800"
                />
                <datalist id="opciones-ciuu">
                  <option value="A0111 - Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas" />
                  <option value="A0112 - Cultivo de arroz" />
                  <option value="A0113 - Cultivo de hortalizas, raíces y tubérculos" />
                  <option value="B0810 - Extracción de piedra, arena, arcillas comunes" />
                  <option value="C1081 - Elaboración de azúcar" />
                  <option value="C1090 - Elaboración de alimentos preparados para animales" />
                  <option value="F4111 - Construcción de edificios residenciales" />
                  <option value="G4690 - Comercio al por mayor no especializado" />
                  <option value="K6412 - Bancos comerciales" />
                  <option value="K6511 - Seguros generales" />
                </datalist>
              </div>

              {/* Póliza */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">Póliza Grandes Beneficiarios Davivienda</label>
                <select 
                  value={poliza}
                  onChange={(e) => setPoliza(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#008B45] focus:outline-none bg-white"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Clasificación */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">Clasificación del cliente</label>
                <select 
                  value={clasificacion}
                  onChange={(e) => setClasificacion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#008B45] focus:outline-none bg-white"
                >
                  <option value="Enfoque">Enfoque</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Pyme">Pyme</option>
                </select>
              </div>

              {/* Selector de Archivo Real (Input File Oculto) */}
              <label 
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center ${
                  nombreArchivo ? "border-emerald-500 bg-emerald-50/50" : "border-slate-300 hover:border-[#008B45] bg-slate-50"
                }`}
              >
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden" 
                />
                
                {nombreArchivo ? (
                  <div className="flex flex-col items-center text-emerald-700">
                    <CheckCircle2 className="w-10 h-10 mb-2 text-[#008B45]" />
                    <span className="font-semibold text-xs">{nombreArchivo} listo</span>
                    <span className="text-[10px] text-emerald-600 mt-1">Haz clic para cambiar de archivo</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <UploadCloud className="w-10 h-10 mb-2 text-[#008B45]" />
                    <span className="font-semibold text-xs">Selecciona o arrastra uno o varios archivos</span>
                    <span className="text-[10px] text-slate-400 mt-1">Archivos PDF permitidos</span>
                  </div>
                )}
              </label>

              {/* Botón de Procesar */}
              <button 
                onClick={() => setVista("tabla")}
                className="w-full mt-4 py-3 bg-[#008B45] hover:bg-[#007037] text-white font-bold text-xs rounded-xl shadow-md transition transform hover:scale-[1.01]"
              >
                Procesar Estado Financiero
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- PASO 3: TABLA CONTABLE COMPARATIVA ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setVista("formulario")}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            title="Volver a la selección de documento"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#008B45] flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900">
              Seguros Bolívar <span className="text-[#008B45]">| ANALIA</span>
            </span>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Actividad: <span className="font-semibold text-slate-700">{ciuu}</span> | Póliza: <span className="font-semibold text-slate-700">{poliza}</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-12 gap-6">
        <section className="col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Tabla contable comparativa</h2>
                <p className="text-xs text-slate-500">Haz clic en cualquier valor para editarlo. Los campos sin dato se muestran como 0.</p>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Exportar Excel</span>
                </button>
                <button className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">CUENTA</th>
                    <th className="py-2.5 px-4 font-semibold text-right">2025</th>
                    <th className="py-2.5 px-4 font-semibold text-right">2024</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {datos.map((row) => (
                    <tr key={row.id} className={row.esTotal ? "bg-emerald-50/70 font-bold text-[#008B45]" : "hover:bg-slate-50"}>
                      <td className="py-2 px-4 capitalize">{row.cuenta}</td>
                      <td className="py-1.5 px-4 text-right">
                        <input 
                          type="text" 
                          value={formatCOP(row.y2025)} 
                          onChange={(e) => handleCellChange(row.id, "y2025", e.target.value)}
                          className={`w-32 text-right px-2 py-1 rounded border ${row.esTotal ? "bg-white font-bold border-emerald-300 text-[#008B45]" : "border-slate-200"} focus:ring-1 focus:ring-[#008B45]`}
                        />
                      </td>
                      <td className="py-1.5 px-4 text-right">
                        <input 
                          type="text" 
                          value={formatCOP(row.y2024)} 
                          onChange={(e) => handleCellChange(row.id, "y2024", e.target.value)}
                          className={`w-32 text-right px-2 py-1 rounded border ${row.esTotal ? "bg-white font-bold border-emerald-300 text-[#008B45]" : "border-slate-200"} focus:ring-1 focus:ring-[#008B45]`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="col-span-4 flex flex-col space-y-6">
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center flex-1">
            <FileText className="w-10 h-10 text-[#008B45] mb-2" />
            <span className="text-xs font-bold text-slate-700">Documento cargado</span>
            <span className="text-[11px] text-slate-400 mt-1">{nombreArchivo || "Documento_Sin_Nombre.pdf"}</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Panel de Cupos</h3>
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl mb-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 block">CUPO TOTAL</span>
              <span className="text-xl font-black text-[#008B45]">{cuposCalculados ? "$ 1.500.000.000" : "$0"}</span>
            </div>
            <button 
              onClick={solicitarCalculo}
              className="w-full py-2.5 bg-[#008B45] hover:bg-[#007037] text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Calcular Cupo
            </button>
          </div>
        </section>
      </main>

      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">¿Deseas continuar?</h3>
            <p className="text-xs text-slate-600 mb-6">Hay campos financieros con valor <strong>$0</strong> en la tabla contable.</p>
            <div className="flex space-x-2">
              <button onClick={() => setMostrarModal(false)} className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
                Cancelar
              </button>
              <button onClick={() => { setMostrarModal(false); setCuposCalculados(true); }} className="flex-1 py-2 text-xs font-semibold text-white bg-[#008B45] hover:bg-[#007037] rounded-lg shadow-sm">
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
