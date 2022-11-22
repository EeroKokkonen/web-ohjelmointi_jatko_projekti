import "./css/Input.css"
import { forwardRef } from "react";


const Input = forwardRef(({label, type}, ref) => {

    return (
    <div className="container">
        <label className="labelBox">{label}</label>
        <input className="inputBox"type={type && "password"} ref={ref}/>
    </div>);
});

export default Input;