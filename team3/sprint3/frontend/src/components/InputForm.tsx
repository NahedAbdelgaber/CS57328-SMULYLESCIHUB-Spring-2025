import { InputHTMLAttributes, JSX } from "react";
import { Label } from ".";

export default function InputForm({
    id, type, className = "", required, children, ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    if (!id) {
        throw new Error("InputForm requires an id prop for accessibility reasons.");
    }

    return (
        <div className="mb-3">
            <Label htmlFor={id} type="form-label" required={required ?? false}>
                {children}
            </Label>
            <input
                id={id}
                type={type}
                className={`form-control ${className}`.trim()}
                required={required}
                {...props}
            />
        </div>
    );
}
