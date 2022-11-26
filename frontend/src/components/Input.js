import "./css/Input.css"
import { forwardRef } from "react";


const Input = forwardRef(({label, type}, ref) => {
    return (
        <div>
            <label className="labelBox">{label}</label>
            <input className="inputBox" type={(type)} ref={ref}/>
        </div>
    );
});

export default Input;