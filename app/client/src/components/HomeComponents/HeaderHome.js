import { useContext, useState } from "react";
import Button from "../LoginComponents/Button";
import { LoginContext } from "../../utils/contexto/LoginContext";
import { useNavigation } from "../../utils/hooks/useNavigation";

export const HeaderHome = () => {
    const { login } = useContext(LoginContext);
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

            {!login ? (
                <div className="HeaderHome__Buttons">
                    <Button onClick={() => navigate('/user/register')}>Registrate</Button>
                    <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                </div>
            ) : (
                <div>D</div>
            )}
        </header>
    )
}