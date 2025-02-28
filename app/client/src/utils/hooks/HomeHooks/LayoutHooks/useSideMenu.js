import { useContext, useEffect } from "react";
import { LoginContext } from "../../../contexto/GeneralContext/LoginContext";
import { ComponentContext } from "../../../contexto/GeneralContext/ComponentContext";
import { useNavigation } from "../../GeneralHooks/useNavigation";

export const useSideMenu = () => {
    const { login, toggleLogin } = useContext(LoginContext);
        const { toggleComponent } = useContext(ComponentContext);
        const navigate = useNavigation();
    
        useEffect(() => {
            const user = localStorage.getItem('token');
    
            user ? toggleLogin(1) : toggleLogin(0); 
        }, [])
    
        const handleSubmit = () => {
            localStorage.removeItem('token');
            toggleLogin(0);
            navigate('/login');
        }
    
        return {login, toggleComponent, handleSubmit}
}