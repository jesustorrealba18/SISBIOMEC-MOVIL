import { parsearFecha } from './fechas';

export const REGEX = {
  cedula: /^[VEJ]-\d{7,8}$/,
  telefono: /^0\d{3}-\d{7}$/,
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  letras: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/,
  feveda: /^FED-\d{3,6}$/,
};

export function validarFechaNacimiento(valor) {
  const fecha = parsearFecha(valor);
  if (!fecha) return 'Ingrese una fecha válida (DD/MM/AAAA)';
  const hoy = new Date();
  if (fecha > hoy) return 'La fecha no puede ser futura';
  const edad = (hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (edad < 4) return 'El atleta debe tener al menos 4 años';
  if (edad > 90) return 'Verifique la fecha: edad fuera de rango';
  return true;
}

export function validarFechaNoFutura(valor) {
  const fecha = parsearFecha(valor);
  if (!fecha) return 'Ingrese una fecha válida (DD/MM/AAAA)';
  if (fecha > new Date()) return 'La fecha no puede ser futura';
  return true;
}
