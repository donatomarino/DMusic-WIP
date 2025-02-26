import Button from '../../components/GeneralComponents/Button';
import FormField from '../../components/LoginComponents/FormField';
import { Header } from '../../components/LoginComponents/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLogin } from '../../utils/hooks/LoginHooks/useLogin';
import '../../styles/login/login.css';
import { ToastContainer } from 'react-toastify';

export const LoginPage = () => {
    const {email, navigate, pass, showPassword, setShowPassword, setEmail, setPassword, handleSubmit} = useLogin();

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

            <ToastContainer />
        </form>
    );
}