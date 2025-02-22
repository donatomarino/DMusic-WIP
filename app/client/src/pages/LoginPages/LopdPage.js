import React from 'react';
import Button from '../../components/GeneralComponents/Button';
import FormField from '../../components/LoginComponents/FormField'
import { useLopd } from '../../utils/hooks/useLopd';
import '../../styles/login/lopd.css';

export default function Lopd() {

    const { toggleLopd, lopdData, acceptChecker } = useLopd()

    return (
        <div className="Lopd__Container">
            <form onSubmit={acceptChecker} >
                <div className="Lopd__TextContainer">
                    <p className="Lopd__Text">{lopdData}</p>
                    <div className='Lopd__InputContainer'>
                        
                        <FormField
                        type="checkbox" 
                        id="lopd" name="lopd" 
                        onChange={toggleLopd} required
                        />

                        <Button
                            type="submit"
                            className="Lopd__Button"
                            onclick={acceptChecker}
                        >Acepto términos y condiciones
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}