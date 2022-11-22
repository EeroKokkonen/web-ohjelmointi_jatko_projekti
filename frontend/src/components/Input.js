import "./css/Input.css"
import { forwardRef } from "react";


const Input = forwardRef(({label, type}, ref) => {
    return (
        <div>
            <label className="labelBox">{label}</label>
            <input className="inputBox"type={type && "text"} ref={ref}/>
        </div>
    );
});

export default Input;