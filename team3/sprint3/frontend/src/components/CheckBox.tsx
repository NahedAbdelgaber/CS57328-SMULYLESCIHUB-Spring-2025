import { InputHTMLAttributes, JSX } from "react";
import { Label } from ".";

export default function CheckBox({
    id, label, className = "", required, ...props
}: { id: string; label: string; required: boolean; } & InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    if (!id) {
        throw new Error("FormInput requires an id prop for accessibility reasons.");
    }

    return (
        <div className="form-check mb-3">
            <input
                id={id}
                className={`form-check-input ${className}`.trim()}
                type="checkbox"
                required={required}
                {...props}
            />
            <Label htmlFor={id} type="form-check-label" required={required}>
                {label}
            </Label>
        </div>
    );
}
