import { useMemo, useState } from 'react';

export function useSearch(items, campos) {
  const [query, setQuery] = useState('');

  const resultados = useMemo(() => {
    const texto = query.trim().toLowerCase();
    if (!texto) return items;
    return items.filter((item) =>
      campos.some((campo) => String(item[campo] ?? '').toLowerCase().includes(texto))
    );
  }, [items, query, campos.join(',')]);

  return { query, setQuery, resultados };
}
