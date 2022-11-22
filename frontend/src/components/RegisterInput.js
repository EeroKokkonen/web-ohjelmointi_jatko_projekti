import Input from "./Input"
import { useState, useEffect, useRef } from "react";

const RegisterInput = ({buttonText, userProfile}) => {
    if(userProfile == null){
        userProfile = {
            firstname: "",
            lastname: "",
            address:"",
            email:"",
            password:"",
        }
    }
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errorText, setErrorText] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        const errorColor = "#ED4048";
        if (firstnameRef.current.value === ""){
            firstnameRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        if (lastnameRef.current.value === ""){
            lastnameRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        if (addressRef.current.value === ""){
            addressRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        if (emailRef.current.value === ""){
            emailRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        if (passwordRef.current.value === ""){
            passwordRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        
        if(error){
            return;
        }
    }

    return <div>
        <p className="errorText">{errorText}</p>
        <Input label={"Etunimi"} ref={firstnameRef} value={userProfile.firstname}/>
        <Input label={"Sukunimi"} ref={lastnameRef}/>
        <Input label={"Osoite"} ref={addressRef}/>
        <Input label={"Sähköposti"} ref={emailRef}/>
        <Input label={"Salasana"} type={"password"} ref={passwordRef}/>
        <button className="btn" onClick={handleSubmit}>{buttonText}</button>
        <button className="btn" onClick={console.log("Peruutus")}>Peruuta</button>

    </div>
    
};

export default RegisterInput;