import Button from "../GeneralComponents/Button";
import FormField from "../LoginComponents/FormField";
import { FaChevronLeft } from "react-icons/fa";
import { Header } from "../LoginComponents/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFirstRegister } from "../../utils/hooks/RegisterHooks/useFirstRegister";
import "../../styles/login/login.css";

export const FirstRegister = () => {
    const { datos, navigate, toggleDatos, confirmPass, setConfirmPass, showPassword, setShowPassword, handleSubmit } = useFirstRegister();

    return (
        <form onSubmit={handleSubmit} method='POST'>
            <Header description={'Únete ahora y disfruta de todo el contenido'} />

            <div className="RegisterPage__Container">
                <div className="RegisterPage__Container--Emotion" onClick={() => { navigate('/login'); localStorage.removeItem('token') }}><FaChevronLeft size={18} color="white" /></div>
                <div className="RegisterPage__Options">
                    <div className="RegisterPage__Options--Routes">Paso 1 de 2</div>
                    <div className="RegisterPage__Options--Description">Crea usuario</div>
                </div>
            </div>

            <div className='Login__InputContainer--Register'>
                <FormField
                    label={'Nombre completo'}
                    type={'text'}
                    id={'full_name'}
                    placeholder={'Introduce tu nombre completo'}
                    value={datos.full_name}
                    onChange={(e) => toggleDatos({ ...datos, full_name: e.target.value })}
                    required
                    minLength={4}
                />
            </div>

            <div className='Login__InputContainer--Register'>
                <FormField
                    label='Contraseña'
                    type={showPassword ? 'text' : 'password'}
                    id={'password'}
                    placeholder={'Introduce tu contraseña'}
                    value={datos.password}
                    onChange={(e) => toggleDatos({ ...datos, password: e.target.value })}
                    required
                />

                <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="Login__Button--togglePasswordVisibility--Register"
                >
                    {showPassword ? <FaEye color='#1668d4' size={28} /> : <FaEyeSlash color='#1668d4' size={28} />}
                </Button>
            </div>

            <div className='Login__InputContainer--Register'>
                <FormField
                    label={'Confirma contraseña'}
                    type={'password'}
                    id={'confirm-password'}
                    placeholder={'Introduce tu contraseña'}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                />

                <div>
                    <Button type='submit' className='Login__Button--Submit'>Siguiente</Button>
                </div>
            </div>
        </form>
    )
}