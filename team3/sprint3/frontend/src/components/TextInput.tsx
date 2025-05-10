import { InputHTMLAttributes, JSX } from "react";
import InputForm from "./InputForm";

export default function TextInput({
    id, className = "", required, children, ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    return (
        <InputForm
            id={id ?? ""}
            type="text"
            required={required ?? false}
            {...props}
        >
            {children}
        </InputForm>
    );
}
