import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/GeneralComponents/Button';
import FormField from '../../components/LoginComponents/FormField';
import { useNavigation } from '../../utils/hooks/useNavigation';
import { LoginContext } from '../../utils/contexto/LoginContext';
import { DataContext } from '../../utils/contexto/DataContext';
import { Header } from '../../components/LoginComponents/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/login/login.css';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [isMatch, setIsMatch] = useState(false);
    const { toggleLogin } = useContext(LoginContext);
    const { toggleDatos } = useContext(DataContext);
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
            const response = await fetch('http://localhost:5001/dmusic/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                const dataToSave = data.token.split(' ')[1]; // Cogemos el token del response

                // Pintamos el token en el LocalStorage
                localStorage.setItem('token', dataToSave);

                toggleLogin(1);
                navigate('/');
            } else {
                setIsMatch(true);
                console.log('Error en la solicitud', response.statusText);
            }
        } catch (err) {
            console.log('Error en la solicitud: ', err);
        }
    }

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <Header
                description={'Inicia sesión en DMusic'}
                onClick={() => navigate('/')}
            />

            <div className='Login__InputContainer'>
                <FormField
                    label={'Correo electrónico'}
                    type={'email'}
                    id={'email'}
                    placeholder={'Introduces tu correo electrónico'}
                    name={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className='Login__InputContainer'>
                <FormField
                    label={'Password'}
                    type={showPassword ? 'text' : 'password'}
                    id={'password'}
                    placeholder={'Introduces tu contraseña'}
                    name={'password'}
                    value={pass}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="Login__Button--togglePasswordVisibility"
                >
                    {showPassword ? <FaEye color= '#1668d4' size={28} /> : <FaEyeSlash color= '#1668d4' size={28} />}
                </Button>
            </div>

            {isMatch &&
                <div className='Login__Error-Confirma'>
                    <p className="Login__Error-Confirma">Email o password incorrectos</p>
                </div>
            }

            <div>
                <Button type='submit' className='Login__Button--Submit'>Iniciar sesión</Button>
            </div>

            <div>
                <Button className='Login__Button--Routes' onClick={() => navigate('/user/forgot-password')}>
                    ¿Se te ha olvidado la contraseña?
                </Button>
            </div>

            <div>
                <span className='Login__Span'>¿No tienes cuenta?</span>
                <Button className='Login__Button--Routes' onClick={() => { navigate('/user/register') }}>
                    Regístrate en DMusic
                </Button>
            </div>

        </form>
    );
}