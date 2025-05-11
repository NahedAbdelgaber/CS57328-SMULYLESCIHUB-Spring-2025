import { JSX, TextareaHTMLAttributes } from "react";
import { Label } from ".";

export default function TextArea({
    id, className = "", required, children, ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
    if (!id) {
        throw new Error("InputForm requires an id prop for accessibility reasons.");
    }

    return (
        <div className="mb-3">
            <Label htmlFor={id} type="form-label" required={required ?? false}>
                {children}
            </Label>
            <textarea
                id={id}
                className={`form-control ${className}`.trim()}
                required={required}
                {...props}
            />
        </div>
    );
}
