import React, { createContext, useState } from 'react';

// Creamos el contexto
export const LoginContext = createContext();
// Creamos el proveedor del contexto
export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(0);

  // Función para cambiar el tipo de vista
  const toggleLogin = (n) => {
    setLogin(n)
  };

  return (
    <LoginContext.Provider value={{ login, toggleLogin}}>
      {children}
    </LoginContext.Provider>
  );
};