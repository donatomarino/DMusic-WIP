import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "../GeneralHooks/useNavigation";
import useFetch from '../GeneralHooks/useFetch';

export const useConfirmRecovery = () => {
    const navigate = useNavigation();
    const [message, setMessage] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const {fetchData, fetchError} = useFetch();
    let { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass === confirmPass) {
            try {
                const response = await fetchData({
                    endpoint: `/confirm-recovery/${token}`,
                    method: 'PATCH',
                    body: {pass}
                })

                if (response && response.length !== 0) {
                    setMessage('Contraseña actualizada correctamente');
                    setConfirmReset(!confirmReset)
                } else {
                    console.log(fetchError);
                }
            } catch (err) {
                console.log('Error en la solicitud: ', err);
            }
        } else {
            setMessage('Las contraseñas no coinciden.');
        }
    };

    return {pass, setPass, navigate, message, confirmPass, setConfirmPass, setShowPassword, showPassword, handleSubmit, confirmReset}
}