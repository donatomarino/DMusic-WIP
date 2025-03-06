import React, { useEffect } from 'react';
import Button from '../../components/GeneralComponents/Button';
import FormField from '../../components/LoginComponents/FormField'
import { useLopd } from '../../utils/hooks/RegisterHooks/useLopd';
import '../../styles/login/lopd.css';

export default function Lopd() {

    const { toggleLopd, lopdData, acceptChecker } = useLopd();

    return (
        <div className="Lopd__Container">
            <form onSubmit={acceptChecker} >
                <div className="Lopd__TextContainer">
                    <p className="Lopd__Text">{lopdData}</p>
                    <div className='Lopd__InputContainer'>

                        <FormField
                            type="checkbox"
                            id="lopd" name="lopd"
                            onChange={toggleLopd}
                            required
                        />

                        <Button
                            type="submit"
                            className="Lopd__Button"
                        >Acepto términos y condiciones
                        </Button>
                    </div>
                    <Button className = "Login__Button--Routes" onClick={acceptChecker}>
                        Volver al login
                    </Button>
                </div>
            </form>
        </div>
    );
}