import Label from '../../GeneralComponents/Label';
import Button from "../../GeneralComponents/Button";
import { FaRegSmile } from "react-icons/fa";
import { useUserData } from '../../../utils/hooks/HomeHooks/MainHooks/useUserData';
import '../../../styles/home/UserData.css';

export const UserData = () => {
    const { navigate, datos } = useUserData();

    return (
        <div className="UserData__Container">
            <div className="UserData__Header">
                <h2 className="UserData__Header--h2">Hola, {datos.full_name}! <span className="UserData__Header--emoji"><FaRegSmile size={25} color="yellow" /></span></h2>
            </div>

            <div className="UserData__Content">
                <div className="UserData__Content--Item">
                    <Label>Nombre:</Label>
                    <div className="UserData__Content--div">{datos.full_name}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Email:</Label>
                    <div className="UserData__Content--div">{datos.email}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Fecha de nacimiento</Label>
                    <div className="UserData__Content--div">{datos.birthdate.slice(0, 10).split('-').reverse().join('-')}</div>
                </div>

                <div className="UserData__Content--Item">
                    <Label>Genero</Label>
                    <div className="UserData__Content--div">{datos.gender.toUpperCase()}</div>
                </div>

                <Button className='UserData__Button' onClick={() => navigate('/user/forgot-password')}>
                    Restablece contraseña
                </Button>
            </div>
        </div>
    )
}