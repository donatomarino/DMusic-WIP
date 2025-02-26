import { useState, useContext } from "react";
import { useNavigation } from "../GeneralHooks/useNavigation";
import { ComponentContext } from "../../contexto/GeneralContext/ComponentContext";
import { DataContext } from '../../contexto/RegisterContext/DataContext';

export const useFirstRegister = () => {
    const navigate = useNavigation();
    const { datos, toggleDatos } = useContext(DataContext);
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { toggleComponent } = useContext(ComponentContext);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (datos.password !== confirmPass) {
            setMessage('Las contraseñas no coinciden');
            return;
        } else {
            toggleComponent(1)
            setMessage('');
        }
    }

    return {datos, navigate, toggleDatos, confirmPass, setConfirmPass, showPassword, setShowPassword, message, handleSubmit }
}