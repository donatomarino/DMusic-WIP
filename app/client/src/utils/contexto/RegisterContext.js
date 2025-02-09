import React, { createContext, useState } from 'react';

// Crear el contexto para el rol del usuario
export const RegisterContext = createContext();

// Crear el proveedor del contexto
export const RegisterProvider = ({ children }) => {
  const [page, setPage] = useState(0); // Estado para almacenar el rol del usuario

  // Función para actualizar el rol (por ejemplo, después de iniciar sesión)
  const nextPage = (number) => {
    setPage(number);
  };

  return (
    <RegisterContext.Provider value={{ page, nextPage }}>
      {children}
    </RegisterContext.Provider>
  );
};