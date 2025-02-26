import Button from "../../components/GeneralComponents/Button";
import FormField from "../../components/LoginComponents/FormField";
import { Header } from "../../components/LoginComponents/Header";
import { useRecoveryPass } from "../../utils/hooks/LoginHooks/useRecoveryPass";
import { ToastContainer } from "react-toastify";
import "../../styles/login/login.css";

export const RecoveryPassPage = () => {
    const {navigate, email, setEmail, message, handleSubmit} = useRecoveryPass();

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

            <ToastContainer />
        </form>
    );
}