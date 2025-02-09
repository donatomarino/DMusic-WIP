import React, { createContext, useState } from 'react';

// Creamos el contexto
export const LopdContext = createContext();
// Creamos el proveedor del contexto
export const LopdProvider = ({ children }) => {
    const [acceptLopd, setAcceptLopd] = useState(false);

  // Función para cambiar el tipo de vista
  const toggleLopd = () => {
    setAcceptLopd((prevAcceptLopd) => (prevAcceptLopd === false ? true : false));
  };

  return (
    <LopdContext.Provider value={{ acceptLopd, toggleLopd }}>
      {children}
    </LopdContext.Provider>
  );
};