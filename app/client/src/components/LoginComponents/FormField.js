import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Label from "../GeneralComponents/Label";
import Input from "../GeneralComponents/Input";
import Button from "../GeneralComponents/Button";

export default function FormField({ id, label, type, value, onChange, placeholder, minLength, name }) {
        const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='Login__FieldContainer'>
            <Label htmlFor={id}>
                {label}
            </Label>
            {type === "password" ? (
                <>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id={id}
                        className="input"
                        value={value}
                        name={name}
                        onChange={onChange}
                        placeholder={placeholder}
                        required
                    />
                    <Button
                        type="button"
                        className = "Login__Button--togglePasswordVisibility"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye fontSize={'20px'} /> : <FaEyeSlash />}
                    </Button>
                </>
            ) : (
                <Input
                    type={type}
                    id={id}
                    className="input"
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    minLength={minLength}
                    required
                />
            )}
        </div>
    );
}