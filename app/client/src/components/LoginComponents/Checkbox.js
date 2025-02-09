import Input from '../GeneralComponents/Input';
import { LopdContext } from '../../utils/contexto/LopdContext';
import { useContext } from 'react';

export default function Checkbox() {
    const { acceptLopd, toggleLopd } = useContext(LopdContext);

    return (
        <div className="Checkbox__Container">
            <Input 
                type="checkbox" 
                id="lopd" 
                name="lopd" 
                required 
                checked={acceptLopd}
                onChange={toggleLopd}
            /> 
            <a href="/user/lopd" className="Checkbox__Container--link">
                Acepto términos y condiciones
            </a>
        </div>
    );
}