import { useContext, useEffect } from "react";
import { ComponentContext } from "../../utils/contexto/GeneralContext/ComponentContext";
import { FirstRegister } from "../../components/RegistrationComponents/FirstRegister";
import { SecondRegister } from "../../components/RegistrationComponents/SecondRegister";
import "../../styles/login/login.css";
import { ToastContainer } from "react-toastify";
import Lopd from "../../components/RegistrationComponents/Lopd";
import { LopdContext } from "../../utils/contexto/RegisterContext/LopdContext";

export const RegisterPage = () => {
    const { component, toggleComponent } = useContext(ComponentContext);
    const { toggleLopd } = useContext(LopdContext);

    useEffect(() => {
        toggleComponent(0);
    }, [])

    useEffect(() => {
        if (component === 0) {
            toggleLopd();
        }
    }, [ component, toggleLopd]);
    
    return (
        <div className="Login__Form">
            {component === 0 &&
                (<FirstRegister />)
            }

            {component === 1 &&
                (<SecondRegister />)
            }

            {component === 10 &&
                (<Lopd />)
            }

            <ToastContainer />
        </div>
    )
};