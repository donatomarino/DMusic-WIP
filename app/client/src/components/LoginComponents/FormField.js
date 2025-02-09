import Label from "../GeneralComponents/Label";
import Input from "../GeneralComponents/Input";

export default function FormField({ id, label, type, value, onChange, placeholder }) {
    return (
        <div className='Login__FieldContainer'>
                <Label htmlFor={id} className="label">
                    {label}
                </Label>
                {type === "textarea" ? (
                    <textarea
                        id={id}
                        className="input"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    ></textarea>
                ) : (
                    <Input
                        type={type}
                        id={id}
                        className="input"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )}
        </div>
    );
}