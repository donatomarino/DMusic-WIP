import React, { createContext, useState } from 'react';

// Crear el contexto para el rol del usuario
export const SongContext = createContext();

// Crear el proveedor del contexto
export const SongProvider = ({ children }) => {
  // const [search, setSearch] = useState([{
  //   url: 'http://localhost:5001/music/BabyGang_MaChérie_3.mp3',
  //   title: 'Baby Gang - Ma Chérie',
  //   tags: ['music']
  // }]); 

  const [song, setSong] = useState([{
    url: '',
    title: '',
    tags: ['']
  }])
  // Función para actualizar el rol (por ejemplo, después de iniciar sesión)
  const toggleSong = (value) => {
    setSong(value);
  };

  return (
    <SongContext.Provider value={{ song, toggleSong }}>
      {children}
    </SongContext.Provider>
  );
};