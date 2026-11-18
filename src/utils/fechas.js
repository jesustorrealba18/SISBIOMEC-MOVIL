export function formatearFecha(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${date.getFullYear()}`;
}

export function parsearFecha(texto) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto || '')) return null;
  const [dia, mes, anio] = texto.split('/').map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  if (fecha.getDate() !== dia || fecha.getMonth() !== mes - 1 || fecha.getFullYear() !== anio) {
    return null;
  }
  return fecha;
}
