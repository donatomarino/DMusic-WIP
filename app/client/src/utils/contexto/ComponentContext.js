import { createContext, useState } from 'react';

// Crear el contexto
export const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
    const [component, setComponent] = useState('home');

    // Función para cambiar el valor del componente
    const toggleComponent = (newComponent) => {
        setComponent(newComponent);
    };

    return (
        <ComponentContext.Provider value={{ component, toggleComponent }}>
            {children}
        </ComponentContext.Provider>
    );
};
