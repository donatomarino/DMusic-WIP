import { useContext, useEffect} from "react";
import { ComponentContext } from "../../utils/contexto/ComponentContext";
import { FirstRegister } from "../../components/LoginComponents/RegistrationComponents/FirstRegister";
import { SecondRegister } from "../../components/LoginComponents/RegistrationComponents/SecondRegister";
import "../../styles/login/login.css";

export const RegisterPage = () => {
    const { component, toggleComponent} = useContext(ComponentContext);

    // useEffect(() => {
    //     toggleComponent(0);
    // }, [])

    return (
        <div className="Login__Form">
            {component === 0 &&
                (<FirstRegister />)
            }

            {component === 1 &&
                (<SecondRegister />)
            }
        </div>
    )
};