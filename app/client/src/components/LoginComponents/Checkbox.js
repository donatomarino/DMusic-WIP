import Input from '../GeneralComponents/Input';
import { LopdContext } from '../../utils/contexto/RegisterContext/LopdContext';
import { useContext } from 'react';
import { ComponentContext } from '../../utils/contexto/GeneralContext/ComponentContext';

export default function Checkbox() {
    const { acceptLopd, toggleLopd } = useContext(LopdContext);
    const {toggleComponent} = useContext(ComponentContext);

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
            <p className="Checkbox__Container--link" onClick={() => toggleComponent(10)}>
                Acepto términos y condiciones
            </p>
        </div>
    );
}

