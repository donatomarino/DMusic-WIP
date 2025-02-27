import { mailToUser } from "../../utils/email.js";

export const recoveryMail = async (req, res) => {
    try{
        const {email, recoveryLink} = req.body;
        await mailToUser(email, recoveryLink);

        res.status(200).json({
            status: 'Email enviado correctamente.'
        })
    } catch(e) {
        res.status(500).json({message: 'Error en la solicitud: ', e});
    }
}