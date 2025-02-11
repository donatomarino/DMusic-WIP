import { useContext, useState } from "react";
import Button from "../GeneralComponents/Button";
import { LoginContext } from "../../utils/contexto/LoginContext";
import { useNavigation } from "../../utils/hooks/useNavigation";
import {ComponentContext} from '../../utils/contexto/ComponentContext';

export const HeaderHome = () => {
    const { login } = useContext(LoginContext);
    const { toggleComponent } = useContext(ComponentContext);
    const navigate = useNavigation();

    return (
        <header className="HeaderHome__Container">
            <h1 className="HeaderHome__Logo">
                DMusic
            </h1>

            <div className="HeaderHome__SearchBar">
                <div className="HeaderHome__InputContainer">
                    <input type="text" name="searchbar" placeholder="¿Qué quieres reproducir?" />
                    <div><i className="fas fa-search"></i></div>
                </div>
            </div>

            {login === 0 ? (
                <div className="HeaderHome__Buttons">
                    <Button onClick={() => navigate('/user/register')}>Registrate</Button>
                    <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                </div>
            ) : (
                <div className="HeaderHome__Button--Profile" onClick={() => {toggleComponent('user-data')}}>D</div>
            )}
        </header>
    )
}