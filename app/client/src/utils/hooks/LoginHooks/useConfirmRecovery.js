import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "../GeneralHooks/useNavigation";
import {toast} from 'react-toastify';
import { Bounce } from "react-toastify";
import { validatePassword } from "../../general/validatePsw";
import useFetch from '../GeneralHooks/useFetch';

export const useConfirmRecovery = () => {
    const navigate = useNavigation();
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const {fetchData, fetchError} = useFetch();
    let { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            password: pass,
            confirmPass: confirmPass
        }

        const isValid = validatePassword(formData);
        
        if (isValid) {
            try {
                const response = await fetchData({
                    endpoint: `/confirm-recovery/${token}`,
                    method: 'PATCH',
                    body: {pass}
                })

                if (response && response.length !== 0) {
                    toast.success('Contraseña actualizada correctamente', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setConfirmReset(!confirmReset)
                } else {
                    console.log(fetchError);
                }
            } catch (err) {
                console.log('Error en la solicitud: ', err);
            }
        }
    };

    return {pass, setPass, navigate, confirmPass, setConfirmPass, setShowPassword, showPassword, handleSubmit, confirmReset}
}