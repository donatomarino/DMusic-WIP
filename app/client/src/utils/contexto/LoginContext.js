import React, { createContext, useState } from 'react';

// Creamos el contexto
export const LoginContext = createContext();
// Creamos el proveedor del contexto
export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(false);

  // Función para cambiar el tipo de vista
  const toggleLogin = () => {
    setLogin(!login)
  };

  return (
    <LoginContext.Provider value={{ login, toggleLogin}}>
      {children}
    </LoginContext.Provider>
  );
};