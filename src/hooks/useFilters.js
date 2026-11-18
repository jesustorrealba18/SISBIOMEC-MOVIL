import { useMemo, useState } from 'react';

const FILTROS_INICIALES = { atleta: '', aspecto: '', query: '' };

export function useFilters(items, camposBusqueda) {
  const [filters, setFilters] = useState(FILTROS_INICIALES);

  const setFilter = (clave, valor) => {
    setFilters((prev) => ({ ...prev, [clave]: valor }));
  };

  const limpiarFiltros = () => setFilters(FILTROS_INICIALES);

  const resultados = useMemo(() => {
    return items.filter((item) => {
      if (filters.atleta && String(item.idAtleta) !== filters.atleta) return false;
      if (filters.aspecto && item.aspecto !== filters.aspecto) return false;
      const texto = filters.query.trim().toLowerCase();
      if (
        texto &&
        !camposBusqueda.some((campo) => String(item[campo] ?? '').toLowerCase().includes(texto))
      ) {
        return false;
      }
      return true;
    });
  }, [items, filters, camposBusqueda.join(',')]);

  return { filters, setFilter, limpiarFiltros, resultados };
}
