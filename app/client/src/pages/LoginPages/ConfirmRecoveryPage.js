import Button from "../../components/GeneralComponents/Button";
import FormField from "../../components/LoginComponents/FormField";
import { Header } from "../../components/LoginComponents/Header";
import { useConfirmRecovery } from "../../utils/hooks/LoginHooks/useConfirmRecovery";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/login/login.css";
import { ToastContainer } from "react-toastify";

export const ConfirmRecoveryPage = () => {
    const { pass, setPass, navigate, confirmPass, setConfirmPass, setShowPassword, showPassword, handleSubmit, confirmReset } = useConfirmRecovery();

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <Header description={'Restablece tu contraseña'} />

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
                    {showPassword ? <FaEye color='#1668d4' size={28} /> : <FaEyeSlash color='#1668d4' size={28} />}                </Button>
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

            <ToastContainer />
        </form >
    );
}