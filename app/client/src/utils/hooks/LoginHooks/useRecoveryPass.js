import { useContext, useState } from "react";
import { useNavigation } from "../GeneralHooks/useNavigation";
import { MessageContext } from "../../contexto/GeneralContext/MessageContext";
import { toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import useFetch from '../GeneralHooks/useFetch';

export const useRecoveryPass = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const { message, toggleMessage } = useContext(MessageContext);
    const { fetchData } = useFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchData({
                endpoint: '/recovery-password',
                method: 'POST',
                body: { email }
            })

            if (response && response.length !== 0) {
                toggleMessage('Revisa tu correo para restablecer la contraseña.');
            } else {
                toast.error('El correo introducido no está registrado.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (err) {
            console.log('Error en la solicitud: ', err);
        }
    };

    return { navigate, email, setEmail, message, handleSubmit }
}