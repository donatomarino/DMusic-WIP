import React, { createContext, useState } from 'react';

// Crear el contexto para el rol del usuario
export const MessageContext = createContext();

// Crear el proveedor del contexto
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(''); // Estado para almacenar el rol del usuario

  // Función para actualizar el rol (por ejemplo, después de iniciar sesión)
  const toggleMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <MessageContext.Provider value={{ message, toggleMessage }}>
      {children}
    </MessageContext.Provider>
  );
};