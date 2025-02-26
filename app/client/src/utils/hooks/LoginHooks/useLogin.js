import { useState, useEffect, useContext } from "react";
import {LoginContext} from '../../contexto/GeneralContext/LoginContext';
import {useNavigation} from "../GeneralHooks/useNavigation";
import { DataContext } from "../../contexto/RegisterContext/DataContext";
import useFetch from '../../hooks/GeneralHooks/useFetch';

export const useLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [isMatch, setIsMatch] = useState(false);
    const { toggleLogin } = useContext(LoginContext);
    const { toggleDatos } = useContext(DataContext);
    const {fetchData, fetchError} = useFetch();
    const navigate = useNavigation();

    useEffect(() => {
        toggleDatos({
            full_name: '',
            email: '',
            password: '',
            birthdate: '',
            gender: ''
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            pass
        };

        try {
            const response = await fetchData({
                endpoint: '/login',
                method: 'POST',
                body: formData
            })

            if (response && response.length !== 0) {
                const dataToSave = response.token.split(' ')[1]; // Cogemos el token del response

                // Pintamos el token en el LocalStorage
                localStorage.setItem('token', dataToSave);

                toggleLogin(1);
                navigate('/');
            } else {
                setIsMatch(true);
                console.log('Datos incorrectos', fetchError);
            }
        } catch (err) {
            console.log('Error en la solicitud: ', err);
        }
    }

    return {email, navigate, pass, showPassword, setShowPassword, setEmail, setPassword, isMatch, handleSubmit}
}