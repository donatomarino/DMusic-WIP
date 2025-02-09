import { useState, useContext } from "react";
import Button from "../Button";
import FormField from "../FormField";
import { useNavigation } from "../../../utils/hooks/useNavigation";
import { RegisterContext } from "../../../utils/contexto/RegisterContext";
import { DataContext } from "../../../utils/contexto/DataContext";
import "../../../styles/login/login.css"

export const FirstRegister = () => {
    const navigate = useNavigation();
    const { datos, toggleDatos } = useContext(DataContext);
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { nextPage } = useContext(RegisterContext);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (datos.password !== confirmPass) {
            setMessage('Las contraseñas no coinciden');
            return;
        } else {
            nextPage(1)
            setMessage('');
        }
    }

    return (
        <form onSubmit={handleSubmit} method='POST'>
            <div className='Login__HeaderContainer'>
                <h1 className='Login__HeaderContainer--Title'>DMusic</h1>
                <h2 id='Login_HeaderContainer--Description'>Únete ahora y disfruta de todo el contenido</h2>
            </div>

            <div className="RegisterPage__Container">
                <div className="RegisterPage__Container--Emotion" onClick={() => navigate('/login')}>◀️</div>
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
                    <img src={showPassword ? '/images/ojo.png' : '/images/ojo2.png'} className="Login__InputContainer--icon" alt="Toggle visibility" />
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

                {message &&
                    <div className='Login__Error-Confirma Register__Error-Confirma'>
                        <p className="Login__Error-Confirma">{message}</p>
                    </div>
                }
            </div>
        </form>
    )
}