import validator from 'validator';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export const validatePassword = (values) => {
    if (values.password !== values.confirmPass){
        toast.error('Las contraseñas no coinciden', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return false;
    }

    if (validator.isStrongPassword(values.password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0
    })) {
        return true;
    } else {
        toast.error('La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return false;
    }
}
