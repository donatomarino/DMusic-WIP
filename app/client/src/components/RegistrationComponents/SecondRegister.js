import Label from "../GeneralComponents/Label";
import Input from "../GeneralComponents/Input";
import Checkbox from "../LoginComponents/Checkbox";
import Button from "../GeneralComponents/Button";
import FormField from "../LoginComponents/FormField";
import { FaChevronLeft } from "react-icons/fa";
import { Header } from "../LoginComponents/Header";
import { useSecondRegister } from "../../utils/hooks/RegisterHooks/useSecondRegister";
import "../../styles/login/login.css";
import { useEffect } from "react";

export const SecondRegister = () => {
    const {datos, toggleDatos, message, handleSubmit, handlePage, toggleComponent, isRegistred} = useSecondRegister();

    useEffect(() => {
        console.log(datos)
    }
    ,[datos])
   
    return (
        <form onSubmit={handleSubmit} method='POST'>
            <Header description={'Únete ahora y disfruta de todo el contenido'} />

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
