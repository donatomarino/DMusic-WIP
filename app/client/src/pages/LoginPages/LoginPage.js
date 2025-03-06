import Button from '../../components/GeneralComponents/Button';
import FormField from '../../components/LoginComponents/FormField';
import { Header } from '../../components/LoginComponents/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLogin } from '../../utils/hooks/LoginHooks/useLogin';
import '../../styles/login/login.css';
import { ToastContainer } from 'react-toastify';

export const LoginPage = () => {
    const { email, navigate, pass, showPassword, setEmail, setPassword, handleSubmit } = useLogin();

    return (
        <div className='Login__Container'>
            <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
                <div className='Login__divContainer'>
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

                    <div className='Login__InputContainer Login__InputContainer--Pass'>
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
                    </div>

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
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}