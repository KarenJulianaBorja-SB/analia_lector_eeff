import React, { useState } from "react";
import { 
  FileSpreadsheet, Download, AlertTriangle, CheckCircle, 
  FileText, ArrowRight, RefreshCw, Calculator, ShieldCheck, ArrowLeft 
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
  const [vista, setVista] = useState("inicio"); // 'inicio' | 'lector'
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cuposCalculados, setCuposCalculados] = useState(false);

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

  const confirmarModal = () => {
    setMostrarModal(false);
    setCuposCalculados(true);
  };

  const formatCOP = (val) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(val);

  // --- VISTA 1: MENU DE SELECCION INICIAL ---
  if (vista === "inicio") {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-slate-900 overflow-hidden font-sans">
        {/* Fondo decorativo con temática AI / Seguros Bolívar */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#003b1d] opacity-90" />
        
        {/* Tarjeta Modal del Menú */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white/20">
          <div className="flex flex-col items-center mb-6">
            {/* Escudo / Logo */}
            <div className="w-16 h-16 bg-[#008B45] text-white rounded-full flex items-center justify-center mb-3 shadow-lg shadow-emerald-900/30">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">SEGUROS BOLÍVAR</span>
            <h1 className="text-3xl font-black tracking-tight text-[#008B45] mt-1">ANALIA</h1>
            <p className="text-xs text-slate-500 mt-2 font-medium">Por favor seleccione el servicio que desea utilizar</p>
          </div>

          {/* Botones de Selección */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <button 
              disabled 
              className="p-3 rounded-2xl bg-emerald-900/40 text-emerald-200 text-xs font-semibold opacity-60 cursor-not-allowed flex flex-col items-center justify-center h-20 text-center leading-tight"
            >
              Lector de Contratos
            </button>

            <button 
              onClick={() => setVista("lector")}
              className="p-3 rounded-2xl bg-[#008B45] hover:bg-[#007037] text-white text-xs font-bold transition transform hover:scale-105 shadow-lg shadow-emerald-800/40 flex flex-col items-center justify-center h-20 text-center leading-tight ring-4 ring-emerald-500/20"
            >
              Lector de EEFF
            </button>

            <button 
              disabled 
              className="p-3 rounded-2xl bg-emerald-900/40 text-emerald-200 text-xs font-semibold opacity-60 cursor-not-allowed flex flex-col items-center justify-center h-20 text-center leading-tight"
            >
              Servicio Integrado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA 2: LECTOR DE ESTADOS FINANCIEROS (TABLA + PANEL) ---
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Header Corporativo */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setVista("inicio")}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title="Volver al menú inicial"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#008B45] flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Seguros Bolívar <span className="text-[#008B45] font-semibold">| ANALIA</span>
            </span>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Usuario: <span className="font-medium text-slate-700">karen.juliana.borja@segurosbolivar.com</span>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6">
        
        {/* Tabla Contable */}
        <section className="col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tabla contable comparativa</h2>
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

          <div className="overflow-x-auto border rounded-lg border-slate-200 flex-1">
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
        </section>

        {/* Panel Lateral: Visor PDF y Panel de Cupos */}
        <section className="col-span-4 space-y-6 flex flex-col justify-between">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center border-dashed border-slate-300 min-h-[300px] text-slate-400">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700">Arrastra el estado financiero en PDF aquí</span>
            <span className="text-[11px] text-slate-400 mt-1">o haz clic para seleccionar un archivo</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">Panel de Cupos</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded">
                {cuposCalculados ? "Calculado" : "Pendiente"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 col-span-2">
                <span className="text-emerald-800 text-[10px] font-bold block uppercase">CUPO TOTAL</span>
                <span className="text-lg font-black text-[#008B45]">{cuposCalculados ? "$ 1.500.000.000" : "$0"}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase">MODELO</span>
                <span className="font-semibold text-slate-700">{cuposCalculados ? "Standard A1" : "N/A"}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase">TASA SUGERIDA</span>
                <span className="font-semibold text-slate-700">{cuposCalculados ? "1.2% EA" : "N/A"}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={solicitarCalculo}
                className="flex-1 py-2 bg-[#008B45] hover:bg-[#007037] text-white font-medium text-xs rounded-lg shadow-sm transition"
              >
                Calcular Cupo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Advertencia */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">¿Deseas continuar?</h3>
            <p className="text-xs text-slate-600 mb-6">
              Hay campos financieros con valor <strong>$0</strong> en la tabla contable.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setMostrarModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancelar y Editar
              </button>
              <button 
                onClick={confirmarModal}
                className="flex-1 py-2 text-xs font-semibold text-white bg-[#008B45] hover:bg-[#007037] rounded-lg shadow-sm"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
