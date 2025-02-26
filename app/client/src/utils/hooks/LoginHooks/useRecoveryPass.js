import { useState } from "react";
import { useNavigation } from "../GeneralHooks/useNavigation";
import useFetch from '../GeneralHooks/useFetch';
import { toast} from 'react-toastify';
import { Bounce } from "react-toastify";

export const useRecoveryPass = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const {fetchData} = useFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchData({
                endpoint: '/recovery-password',
                method: 'POST',
                body: {email}
            })

            console.log(response);

            if (response && response.length !== 0) {
                const token = response.token.split(' ')[1];
                console.log(`http://localhost:3000/user/confirm-recovery/${token}`);
                setMessage('Revisa tu correo para restablecer la contraseña.');
            } else {
                console.log('Error')
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
        } catch(err){
            console.log('Error en la solicitud: ', err);
        }
    };

    return {navigate, email, setEmail, message, handleSubmit}
}