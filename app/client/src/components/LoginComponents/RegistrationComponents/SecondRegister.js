import { useState, useContext } from "react";
import Label from "../../GeneralComponents/Label";
import Input from "../../GeneralComponents/Input";
import { ComponentContext } from "../../../utils/contexto/ComponentContext";
import Checkbox from "../Checkbox";
import Button from "../../GeneralComponents/Button";
import { DataContext } from "../../../utils/contexto/DataContext";
import { useNavigation } from "../../../utils/hooks/useNavigation";
import FormField from "../FormField";
import { FaChevronLeft } from "react-icons/fa";
import "../../../styles/login/login.css";

export const SecondRegister = () => {
    const { datos, toggleDatos } = useContext(DataContext);
    const [isRegistred, setIsRegistred] = useState(false);
    const { toggleComponent } = useContext(ComponentContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const register = {
            "full_name": datos.full_name,
            "email": datos.email,
            "password": datos.password,
            "birthdate": datos.birthdate,
            "gender": datos.gender
        }

        try {
            const response = await fetch('http://localhost:5001/dmusic/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(register)
            })

            if (response.ok) {
                setMessage("Usuario registrado correctamente.")
                setIsRegistred(!isRegistred)
            } else {
                setMessage("El correo electrónico ya está registrado.")
            }
        } catch (e) {
            setMessage("Ha habido un problema en el registro: ", e);
        }
    }

    const handlePage = () => {
        toggleComponent(0);
        navigate('/login');
    }

    return (
        <form onSubmit={handleSubmit} method='POST'>
            <div className='Login__HeaderContainer'>
                <h1 className='Login__HeaderContainer--Title'>DMusic</h1>
                <h2 id='Login_HeaderContainer--Description'>Únete ahora y disfruta de todo el contenido</h2>
            </div>

            <div className="RegisterPage__Container">
                <div className="RegisterPage__Container--Emotion" onClick={() => { toggleComponent(0) }}><FaChevronLeft size={18} color="white" /></div>
                <div className="RegisterPage__Options">
                    <div className="RegisterPage__Options--Routes">Paso 2 de 2</div>
                    <div className="RegisterPage__Options--Description">Crea usuario</div>
                </div>
            </div>

            <div className='Login__InputContainer--Register'>
                <FormField
                    label={'Dirección de correo electrónico'}
                    type={'email'}
                    id={'email'}
                    placeholder={'Introduce tu correo electrónico'}
                    value={datos.email}
                    onChange={(e) => toggleDatos({ ...datos, email: e.target.value })}
                    required = 'true'
                />
            </div>

            <div className='Login__InputContainer--Register'>
                <FormField
                    label={'Fecha de nacimiento'}
                    type={'date'}
                    id={'birthdate'}
                    placeholder={'Introduce tu fecha de nacimiento'}
                    value={datos.birthdate}
                    onChange={(e) => toggleDatos({ ...datos, birthdate: e.target.value })}
                    required = 'true'
                />
            </div>

            <div className='Login__InputContainer--Register'>

                <div className='Login__FieldContainer Login__FieldContainer--Radio'>
                    <Label htmlFor={'gender'}>Genero</Label>
                    <div className="Login__RadioContainer">
                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                checked={datos.gender === "hombre"}
                                onChange={() => toggleDatos({ ...datos, gender: "hombre" })}
                            />
                            <Label htmlFor="man">Hombre</Label>
                        </div>

                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="woman"
                                name="gender"
                                value="woman"
                                checked={datos.gender === "mujer"}
                                onChange={() => toggleDatos({ ...datos, gender: "mujer" })}
                            />
                            <Label htmlFor="woman">Mujer</Label>
                        </div>

                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="others"
                                name="gender"
                                value="others"
                                checked={datos.gender === "prefiero no decirlo"}
                                onChange={() => toggleDatos({ ...datos, gender: "prefiero no decirlo" })}
                            />
                            <Label htmlFor="others">Prefiero no decirlo</Label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Login__InputContainer--Register'>
                <Checkbox />
            </div>

            {isRegistred ?
                <div>
                    <Button type='submit' className='Login__Button--Submit' onClick={() => handlePage()}>¡Conéctate ahora!</Button>
                </div> :
                <div>
                    <Button type='submit' className='Login__Button--Submit'>Regístrate</Button>
                </div>
            }

            {message &&
                <div className='Login__Error-Confirma Register__Error-Confirma'>
                    <p className="Login__Error-Confirma">{message}</p>
                </div>
            }
        </form>
    )
}
