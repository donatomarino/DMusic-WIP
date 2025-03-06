import { useContext, useEffect} from "react";
import { ComponentContext } from "../../utils/contexto/GeneralContext/ComponentContext";
import { FirstRegister } from "../../components/RegistrationComponents/FirstRegister";
import { SecondRegister } from "../../components/RegistrationComponents/SecondRegister";
import "../../styles/login/login.css";
import { ToastContainer } from "react-toastify";

export const RegisterPage = () => {
    const { component, toggleComponent} = useContext(ComponentContext);

    useEffect(() => {
        toggleComponent(0);
    }, [])

    return (
        <div className="Login__Form">
            {component === 0 &&
                (<FirstRegister />)
            }

            {component === 1 &&
                (<SecondRegister />)
            }

            <ToastContainer />
        </div>
    )
};