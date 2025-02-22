import React, { useState } from "react";
import Button from "../../components/GeneralComponents/Button";
import { useNavigation } from "../../utils/hooks/useNavigation";
import "../../styles/login/login.css";
import FormField from "../../components/LoginComponents/FormField";
import { Header } from "../../components/LoginComponents/Header";

export const RecoveryPassPage = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/dmusic/recovery-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token.split(' ')[1];
                console.log(`http://localhost:3000/user/confirm-recovery/${token}`);
                setMessage('Revisa tu correo para restablecer la contraseña.');
            } else {
                setMessage('El mail introducido no existe.');
            }
        } catch(err){
            console.log('Error en la solicitud: ', err);
        }
    };

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <Header description={'Recupera tu contraseña'} />

            <div className='Login__InputContainer--Recovery'>
                    <FormField
                        label={'Escribe la dirección de correo electrónico vinculado a tu cuenta'}
                        type={'email'}
                        id={'email'}
                        placeholder={'Introduces tu correo electrónico'}
                        name={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
            </div>

            {message && 
                <div className='Login__Error-Confirma'>
                    <p className="Login__Error-Confirma">{message}</p>
                </div>
            }

            <div>
                <Button type="submit" className='Login__Button--Submit'>
                    Enviar enlace
                </Button>
            </div>

            <div>
                <Button className='Login__Button--Routes' onClick={() => {navigate('/login'); localStorage.removeItem('token')}}>
                    Volver al login
                </Button>
            </div>

        </form>
    );
}