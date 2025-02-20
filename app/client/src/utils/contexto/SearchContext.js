import React, { createContext, useState } from 'react';

// Crear el contexto para el rol del usuario
export const SearchContext = createContext();

// Crear el proveedor del contexto
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState([]);
  
  // Función para actualizar el rol (por ejemplo, después de iniciar sesión)
  const toggleSearch = (value) => {
    setSearch(value);
  };

  return (
    <SearchContext.Provider value={{ search, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};