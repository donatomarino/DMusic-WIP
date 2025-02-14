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
        <div className="SideMenu__Container" >

            <div className="SideMenu__Ul">
                <div className="SideMenu__Menu" onClick={() => toggleComponent('home')}>
                    <span class="SideMenu__Icon"><FaHome size={20} color="#555" /></span>
                    <div>Home</div>
                </div>

                <div className="SideMenu__Menu" onClick={() => toggleComponent('explore')}>
                    <span class="SideMenu__Icon"><FaSearch size={20} color="#555" /></span>
                    <div onClick={() => toggleComponent('explore')}>Explorar</div>
                </div>

                <div className="SideMenu__Menu" onClick={() => toggleComponent('trends')}>
                    <span class="SideMenu__Icon"><FaChartLine size={20} color="#555" /></span>
                    <div>Tendencias</div>
                </div>

                {login === 1 &&
                    <div className="SideMenu__Menu" onClick={() => toggleComponent('library')}>
                        <span class="SideMenu__Icon"><FaMusic size={20} color="#555" /></span>
                        <div>Mi Biblioteca</div>
                    </div>
                }

                {login === 1 &&
                    <div className="SideMenu__Menu" onClick={handleSubmit}>
                        <div className="SideMenu__End">Cerrar Sesión</div>
                    </div>
                }
            </div>
        </div>
    )
}