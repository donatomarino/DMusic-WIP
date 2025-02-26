import { useState } from "react";
import { useNavigation } from "react-router-dom";
import useFetch from '../GeneralHooks/useFetch';

export const useRecoveryPass = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const {fetchData, fetchError} = useFetch();

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
                setMessage(fetchError);
            }
        } catch(err){
            console.log('Error en la solicitud: ', err);
        }
    };

    return {navigate, email, setEmail, message, handleSubmit}
}