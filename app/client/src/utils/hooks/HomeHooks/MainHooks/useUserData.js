import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from "../../GeneralHooks/useNavigation";

export const useUserData = () => {
    const navigate = useNavigation();
    const [datos, setDatos] = useState({
        full_name: '',
        email: '',
        pass: '',
        birthdate: '',
        gender: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('token');
        
        if(user) {
            const UserDatos = {
                full_name: jwtDecode(user).full_name,
                email: jwtDecode(user).email,
                birthdate: jwtDecode(user).birthdate,
                gender: jwtDecode(user).gender
            }
    
            setDatos(UserDatos);
        }
    }, [])

    return {navigate, datos}
}