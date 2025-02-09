import {useNavigation} from './useNavigation';
import {LopdContext} from '../contexto/LopdContext';
import { useState, useContext } from 'react';
import {RegisterContext} from '../contexto/RegisterContext'

export const useLopd = () => {
    const {nextPage} = useContext(RegisterContext);
    const navigate = useNavigation();
    const { toggleLopd } = useContext(LopdContext);
    const [lopdData, setLopdData] = useState('');

    const fetchLopd = async () => {
        try {
            const response = await fetch('http://localhost:5001/dmusic/lopd');
            if (response.ok) {
                const data = await response.json();
                console.log(data[0].text);
                await setLopdData(data[0].text);
            } else {
                console.error("Error en la respuesta del servidor:", response.status);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
    fetchLopd();

    const acceptChecker = (event) => {
        event.preventDefault();
        nextPage(1);
        navigate('/user/register');
    }

return { toggleLopd, lopdData, acceptChecker };
};