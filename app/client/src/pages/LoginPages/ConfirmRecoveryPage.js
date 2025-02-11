import React, { useState } from "react";
import Button from "../../components/GeneralComponents/Button";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { useParams } from "react-router-dom";
import "../../styles/login/login.css";
import FormField from "../../components/LoginComponents/FormField";

export const ConfirmRecoveryPage = () => {
    const navigate = useNavigation();
    const [message, setMessage] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    let { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass === confirmPass) {
            try {
                const response = await fetch(`http://localhost:5001/dmusic/confirm-recovery/${token}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pass })
                });

                if (response.ok) {
                    setMessage('Contraseña actualizada correctamente');
                    setConfirmReset(!confirmReset)
                }
            } catch (err) {
                console.log('Error en la solicitud: ', err);
            }
        } else {
            setMessage('Las contraseñas no coinciden');
        }
    };

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <div className='Login__HeaderContainer'>
                <h1 className='Login__HeaderContainer--Title'>DMusic</h1>
                <h2 id='Login_HeaderContainer--Description'>Restablece la contraseña</h2>
            </div>

            <div className='Login__InputContainer--ChangePass'>
                <FormField
                    label={'Escribe la nueva contraseña'}
                    type={showPassword ? 'text' : 'password'}
                    id={'password'}
                    placeholder={'Introduces la nueva contraseña'}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />

                <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="Login__Button--togglePasswordVisibility"
                >
                    <img src={showPassword ? '/images/ojo.png' : '/images/ojo2.png'} className="Login__InputContainer--icon" alt="Toggle visibility" />
                </Button>
            </div>

            <div className='Login__InputContainer--ChangePass'>
                <FormField
                    label={'Confirma la contraseña'}
                    type={showPassword ? 'text' : 'password'}
                    id={'confirmedPassword'}
                    placeholder={'Confirma la contraseña'}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                />
            </div>

            {message && <div className="Login__Error-Confirma">{message}</div>}

            {!confirmReset ? (
                <div>
                    <Button type="submit" className='Login__Button--Submit'>
                        Confirma la nueva contraseña
                    </Button>
                </div>
            ) : (
                <div>
                    <Button className='Login__Button--Submit' onClick={() => navigate('/login')}>
                        Volver al login
                    </Button>
                </div>
            )}
        </form >
    );
}