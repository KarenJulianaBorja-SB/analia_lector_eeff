// Estructura contable multianual (2025 vs 2024) del Lector de Estados Financieros.
// "destacado" marca las filas de subtotal/total que se muestran en negrita.
export const AÑOS = [2025, 2024];

export const CUENTAS_INICIALES = [
  { key: "efectivo", label: "Efectivo", valores: { 2025: 1000000, 2024: 1000000 } },
  { key: "activoCorriente", label: "Activo corriente", valores: { 2025: 4858837, 2024: 2000000 } },
  { key: "activoNoCorriente", label: "Activo no corriente", valores: { 2025: 3800000, 2024: 3800000 } },
  { key: "totalActivo", label: "Total activo", valores: { 2025: 8658837, 2024: 5800000 }, destacado: true },
  { key: "pasivoCorriente", label: "Pasivo corriente", valores: { 2025: 1383000, 2024: 644140 } },
  { key: "obligacionesCp", label: "Obligaciones CP", valores: { 2025: 0, 2024: 0 } },
  { key: "obligacionesLp", label: "Obligaciones LP", valores: { 2025: 0, 2024: 0 } },
  { key: "totalPasivo", label: "Total pasivo", valores: { 2025: 1383000, 2024: 644140 }, destacado: true },
  { key: "totalPatrimonio", label: "Total patrimonio", valores: { 2025: 7275837, 2024: 5155860 }, destacado: true },
  { key: "reservas", label: "Reservas", valores: { 2025: 0, 2024: 0 } },
  { key: "ingresosOperacionales", label: "Ingresos operacionales", valores: { 2025: 0, 2024: 0 } },
  { key: "costosVentas", label: "Costos de ventas", valores: { 2025: 0, 2024: 0 } },
  { key: "utilidadOperacional", label: "Utilidad operacional", valores: { 2025: 0, 2024: 0 } },
  { key: "gastosFinancieros", label: "Gastos financieros", valores: { 2025: 0, 2024: 0 } },
  { key: "depreciacion", label: "Depreciación", valores: { 2025: 0, 2024: 0 } },
  { key: "amortizacion", label: "Amortización", valores: { 2025: 0, 2024: 0 } },
  { key: "impuestos", label: "Impuestos", valores: { 2025: 0, 2024: 0 } },
  { key: "utilidadNeta", label: "Utilidad neta", valores: { 2025: 2119977, 2024: 355860 }, destacado: true },
  { key: "otrosIngresos", label: "Otros ingresos", valores: { 2025: 0, 2024: 0 } },
  { key: "otrosEgresos", label: "Otros egresos", valores: { 2025: 0, 2024: 0 } },
];
