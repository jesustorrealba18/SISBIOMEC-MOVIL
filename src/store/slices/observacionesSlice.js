import { createSlice, nanoid } from '@reduxjs/toolkit';
import { formatearFecha } from '../../utils/fechas';

const initialState = [
  {
    id: 'o1',
    fecha: '10/11/2026',
    idAtleta: 'a1',
    aspecto: 'Posición del cuerpo',
    sesion: 'Sesión matutina - 16/11/2026',
    calificacion: 4,
    observacion: 'Excelente alineación corporal en estilo libre. Mejorar la posición de la cabeza al respirar.',
  },
  {
    id: 'o2',
    fecha: '10/11/2026',
    idAtleta: 'a2',
    aspecto: 'Batido de piernas',
    sesion: 'Sin sesión asociada',
    calificacion: 2,
    observacion: 'Batido inconsistente, se hunden las piernas en espalda. Trabajar con tabla y aletas cortas.',
  },
  {
    id: 'o3',
    fecha: '11/11/2026',
    idAtleta: 'a1',
    aspecto: 'Viraje',
    sesion: 'Sesión vespertina - 16/11/2026',
    calificacion: 3,
    observacion: 'Viraje aceptable pero pierde velocidad en la salida del muro. Reforzar empuje hidrodinámico.',
  },
  {
    id: 'o4',
    fecha: '12/11/2026',
    idAtleta: 'a4',
    aspecto: 'Respiración',
    sesion: 'Sin sesión asociada',
    calificacion: 5,
    observacion: 'Gran evolución: respiración bilateral fluida sin perder el ritmo de brazada.',
  },
  {
    id: 'o5',
    fecha: '13/11/2026',
    idAtleta: 'a6',
    aspecto: 'Salida de bloque',
    sesion: 'Sesión matutina - 16/11/2026',
    calificacion: 3,
    observacion: 'Buen tiempo de reacción, pero entrada al agua poco compacta. Practicar salidas secas.',
  },
  {
    id: 'o6',
    fecha: '14/11/2026',
    idAtleta: 'a2',
    aspecto: 'Tracción de brazos',
    sesion: 'Sesión vespertina - 16/11/2026',
    calificacion: 4,
    observacion: 'Buena captura de agua en crol. Consolidar la fase final del tirón con pull buoy.',
  },
];

const observacionesSlice = createSlice({
  name: 'observaciones',
  initialState,
  reducers: {
    addObservacion: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(datos) {
        return {
          payload: {
            id: nanoid(6),
            fecha: formatearFecha(new Date()),
            ...datos,
          },
        };
      },
    },
  },
});

export const { addObservacion } = observacionesSlice.actions;
export default observacionesSlice.reducer;
