import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../contexto/RegisterContext/DataContext";
import { useNavigation } from "../GeneralHooks/useNavigation";
import { ComponentContext } from "../../contexto/GeneralContext/ComponentContext";

export const useSecondRegister = () => {
    const { datos, toggleDatos } = useContext(DataContext);
    const [isRegistred, setIsRegistred] = useState(false);
    const { toggleComponent } = useContext(ComponentContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigation();

    useEffect(() => {
        console.log(datos);
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const register = {
            "full_name": datos.full_name,
            "email": datos.email,
            "password": datos.password,
            "birthdate": datos.birthdate,
            "gender": datos.gender
        }

        try {
            const response = await fetch('http://localhost:5001/dmusic/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(register)
            })

            if (response.ok) {
                setMessage("Usuario registrado correctamente.")
                setIsRegistred(!isRegistred)
            } else {
                setMessage("El correo electrónico ya está registrado.")
            }
        } catch (e) {
            setMessage("Ha habido un problema en el registro: ", e);
        }
    }

    const handlePage = () => {
        toggleComponent(0);
        navigate('/login');
    }

    return {datos, toggleDatos, message, handleSubmit, handlePage, toggleComponent, isRegistred}
}