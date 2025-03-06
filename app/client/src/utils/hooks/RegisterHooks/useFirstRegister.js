import { useState, useContext } from "react";
import { useNavigation } from "../GeneralHooks/useNavigation";
import { ComponentContext } from "../../contexto/GeneralContext/ComponentContext";
import { DataContext } from '../../contexto/RegisterContext/DataContext';
import { validatePassword } from '../../general/validatePsw';

export const useFirstRegister = () => {
    const navigate = useNavigation();
    const { datos, toggleDatos } = useContext(DataContext);
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { toggleComponent } = useContext(ComponentContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            password: datos.password,
            confirmPass: confirmPass
        }

        const isValid = validatePassword(formData);

        isValid && toggleComponent(1);
    }

    return { datos, navigate, toggleDatos, confirmPass, setConfirmPass, showPassword, setShowPassword, handleSubmit }
}