import React, { createContext, useState } from 'react';

// Crear el contexto para el rol del usuario
export const SongContext = createContext();

// Crear el proveedor del contexto
export const SongProvider = ({ children }) => {
  const [search, setSearch] = useState(''); // Estado para almacenar el rol del usuario

  // Función para actualizar el rol (por ejemplo, después de iniciar sesión)
  const toggleSong = (value) => {
    setSearch(value);
  };

  return (
    <SongContext.Provider value={{ search, toggleSong }}>
      {children}
    </SongContext.Provider>
  );
};