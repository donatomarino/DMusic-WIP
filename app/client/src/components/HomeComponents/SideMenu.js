import { useContext, useEffect } from "react"
import { LoginContext } from "../../utils/contexto/LoginContext"
import { ComponentContext } from "../../utils/contexto/ComponentContext";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { FaHome, FaSearch, FaChartLine, FaMusic } from "react-icons/fa";

export const SideMenu = () => {
    const { login, toggleLogin } = useContext(LoginContext);
    const { toggleComponent } = useContext(ComponentContext);
    const navigate = useNavigation();

    useEffect(() => {
        const login = localStorage.getItem('token');

        if (login) {
            toggleLogin(1);
        }
    }, [])

    const handleSubmit = () => {
        localStorage.removeItem('token');
        toggleLogin(0);
        navigate('/login');
    }

    return (
        <div className="SideMenu__Container">
            <ul className="SideMenu__Ul">
                <li className="SideMenu__Menu" onClick={() => toggleComponent(2)}>
                    <FaHome className="SideMenu__Menu--icon" />
                    <div>Inicio</div>
                </li>
                <li className="SideMenu__Menu" onClick={() => toggleComponent(3)}>
                    <FaSearch className="SideMenu__Menu--icon" />
                    <div>Explorar</div>
                </li>
                <li className="SideMenu__Menu" onClick={() => toggleComponent(4)}>
                    <FaChartLine className="SideMenu__Menu--icon" />
                    <div>Tendencias</div>
                </li>

                {login === 1 && (
                    <li className="SideMenu__Menu" onClick={() => toggleComponent(5)}>
                        <FaMusic className="SideMenu__Icon" size={20} color="#555" />
                        <div>Mi Biblioteca</div>
                    </li>
                )}

                {login === 1 && (
                    <li className="SideMenu__End" onClick={handleSubmit}>
                        Cerrar Sesión
                    </li>
                )}
            </ul>

        </div>
    );
}