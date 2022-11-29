import "./css/Input.css"
import { forwardRef } from "react";


const Input = forwardRef(({label, type, value, disabled}, ref) => {
    return (
        <div>
            <label className="labelBox">{label}</label>
            <input disabled={disabled}
            className="inputBox" type={(type)}
            ref={ref} defaultValue={value}/>
        </div>
    );
});

export default Input;