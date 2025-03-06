import { LopdContext } from '../../contexto/RegisterContext/LopdContext';
import { useState, useContext, useEffect } from 'react';
import { ComponentContext } from '../../contexto/GeneralContext/ComponentContext';
import useFetch from '../GeneralHooks/useFetch';

export const useLopd = () => {
    const { toggleComponent } = useContext(ComponentContext);
    const { toggleLopd } = useContext(LopdContext);
    const [lopdData, setLopdData] = useState('');
    const { fetchData, fetchError } = useFetch();

    useEffect(() => {
        const fetchLopd = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/lopd'
                })
    
                if (response?.length > 0) {
                    setLopdData(response[0].text);
                } else {
                    console.error("Error en la respuesta del servidor: ", fetchError);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }
        fetchLopd();
    }, [])
    
    const acceptChecker = (event) => {
        event.preventDefault();
        toggleComponent(1);
    }

    return { toggleLopd, lopdData, acceptChecker };
};