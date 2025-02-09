import { useContext, useEffect } from "react"
import { LoginContext } from "../../utils/contexto/LoginContext"
import { ComponentContext } from "../../utils/contexto/ComponentContext";
import { useNavigation } from "../../utils/hooks/useNavigation";

export const SideMenu = () => {
    const { login, toggleLogin } = useContext(LoginContext);
    const { toggleComponent } = useContext(ComponentContext);
    const navigate = useNavigation();

    const handleSubmit = () => {
        localStorage.removeItem('token');
        toggleLogin()
        navigate('/login');
    }

    return (
        <div className="SideMenu__Container" >
            
            <div className="SideMenu__Ul">
                <div className="SideMenu__Menu" onClick={() => toggleComponent('home')}>
                    <i className="SideMenu__Menu--icon"></i>
                    <div>Home</div>
                </div>

                <div className="SideMenu__Menu" onClick={() => toggleComponent('explore')}>
                    <i className="SideMenu__Menu--icon"></i>
                    <div onClick={() => toggleComponent('explore')}>Explorar</div>
                </div>

                <div className="SideMenu__Menu" onClick={() => toggleComponent('trends')}>
                    <i className="SideMenu__Menu--icon"></i>
                    <div>Tendencias</div>
                </div>

                {login &&
                    <div className="SideMenu__Menu" onClick={() => toggleComponent('library')}>
                        <i className="SideMenu__Menu--icon"></i>
                        <div>Mi Biblioteca</div>
                    </div>
                }

                {login &&
                    <div className="SideMenu__Menu" onClick = {handleSubmit}>
                        <div className="SideMenu__End">Cerrar Sesión</div>
                    </div>
                }
            </div>
        </div>
    )
}