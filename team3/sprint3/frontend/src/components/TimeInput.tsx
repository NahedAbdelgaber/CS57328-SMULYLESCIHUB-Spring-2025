import { InputHTMLAttributes, JSX } from "react";
import InputForm from "./InputForm";

export default function TimeInput({
    id, className = "", required, children, ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    return (
        <InputForm
            id={id ?? ""}
            type="time"
            required={required ?? false}
            {...props}
        >
            {children}
        </InputForm>
    );
}
