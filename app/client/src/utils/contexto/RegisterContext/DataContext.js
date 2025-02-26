import React, { createContext, useState } from 'react';

// Creamos el contexto
export const DataContext = createContext();

// Creamos el proveedor del contexto
export const DataProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    full_name: '',
    email: '',
    password: '',
    birthdate: '',
    gender: ''
  }); // Estado inicial

  // Función para cambiar el tipo de vista
  const toggleDatos = async (info) => {
    setDatos(info);
  };

  return (
    <DataContext.Provider value={{ datos, toggleDatos }}>
      {children}
    </DataContext.Provider>
  );
};