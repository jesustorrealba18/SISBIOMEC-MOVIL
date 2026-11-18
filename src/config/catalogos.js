const aOpciones = (valores) => valores.map((valor) => ({ label: valor, value: valor }));

export const ESTADOS_ATLETA = aOpciones(['Activo', 'Inactivo', 'Retirado', 'Transferido']);

export const SEXOS = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
];

export const GRUPOS_SANGUINEOS = aOpciones(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

export const PARENTESCOS = aOpciones(['Padre', 'Madre', 'Hermano/a', 'Tutor', 'Otro']);

export const CATEGORIAS = aOpciones([
  'Infantil A',
  'Infantil B',
  'Juvenil A',
  'Juvenil B',
  'Junior',
  'Absoluta',
]);

export const ASPECTOS_TECNICOS = aOpciones([
  'Posición del cuerpo',
  'Batido de piernas',
  'Tracción de brazos',
  'Coordinación',
  'Respiración',
  'Salida de bloque',
  'Viraje',
  'Llegada',
]);

export const SESIONES = aOpciones([
  'Sin sesión asociada',
  'Sesión matutina - 16/11/2026',
  'Sesión vespertina - 16/11/2026',
  'Sesión matutina - 17/11/2026',
]);
