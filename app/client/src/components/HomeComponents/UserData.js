import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Button from "../GeneralComponents/Button";
import { useNavigation } from "../../utils/hooks/useNavigation";
import Label from '../GeneralComponents/Label';
import '../../styles/home/UserData.css';

export const UserData = () => {
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
                pass: jwtDecode(user).pass,
                birthdate: jwtDecode(user).birthdate,
                gender: jwtDecode(user).gender
            }
    
            setDatos(UserDatos);
        }
    }, [])


    return (
        <div className="UserData__Container">
            <div className="UserData__Header">
                <h2 className="UserData__Header--h2">Hola, {datos.full_name}</h2>
            </div>

            <div className="UserData__Content">
                <div className="UserData__Content--Item">
                    <Label>Nombre:</Label>
                    <div className="UserData__Content--div">{datos.full_name}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Email:</Label>
                    <div className="UserData__Content--div">{datos.email}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Fecha de nacimiento</Label>
                    <div className="UserData__Content--div">{datos.birthdate.slice(0,10).split('-').reverse().join('-')}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Genero</Label>
                    <div className="UserData__Content--div">{datos.gender.toUpperCase()}</div>
                </div>

                <Button className='UserData__Button' onClick={() => navigate('/user/forgot-password')}>
                    Restablece contraseña
                </Button>
            </div>
        </div>
    )
}