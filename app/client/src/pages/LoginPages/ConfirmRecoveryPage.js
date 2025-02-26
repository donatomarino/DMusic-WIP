import Button from "../../components/GeneralComponents/Button";
import FormField from "../../components/LoginComponents/FormField";
import { Header } from "../../components/LoginComponents/Header";
import { useConfirmRecovery } from "../../utils/hooks/LoginHooks/useConfirmRecovery";
import "../../styles/login/login.css";

export const ConfirmRecoveryPage = () => {
    const {pass, setPass, navigate, message, confirmPass, setConfirmPass, setShowPassword, showPassword, handleSubmit, confirmReset} = useConfirmRecovery();

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <Header description={'Restablece tu contraseña'}/>

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