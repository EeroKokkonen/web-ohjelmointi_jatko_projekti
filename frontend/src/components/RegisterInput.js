import Input from "./Input"
import { useState, useEffect, useRef } from "react";
import axios from 'axios';



const RegisterInput = ({buttonText, userProfile, apiUrl}) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkError())
            return;
            
        const user = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            address:addressRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        const response = await axios.post(apiUrl, user);
        console.log(response)
        
    }

    return <div className="registerInputContainer">
        <p className="errorText">{errorText}</p>
        <Input label={"Etunimi"} ref={firstnameRef} value={userProfile.firstname}/>
        <Input label={"Sukunimi"} ref={lastnameRef}/>
        <Input label={"Osoite"} ref={addressRef}/>
        <Input label={"Sähköposti"} ref={emailRef} type={"email"}/>
        <Input label={"Salasana"} type={"password"} ref={passwordRef}/>
        <button className="btn" onClick={handleSubmit}>{buttonText}</button>
        <button className="btn" onClick={console.log("Peruutus")}>Peruuta</button>
    </div>





    function checkError(){
        const errorColor = "rgba(255, 0, 30, 0.3)";
        const normalColor = "rgba(0, 0, 0, 0.7)";
        if (firstnameRef.current.value === ""){
            firstnameRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        else
            firstnameRef.current.style.backgroundColor = normalColor
        if (lastnameRef.current.value === ""){
            lastnameRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        else
            lastnameRef.current.style.backgroundColor = normalColor
        if (addressRef.current.value === ""){
            addressRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        else
            addressRef.current.style.backgroundColor = normalColor
        if (emailRef.current.value === ""){
            emailRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        else
            emailRef.current.style.backgroundColor = normalColor
        if (passwordRef.current.value === ""){
            passwordRef.current.style.backgroundColor = errorColor;
            setError(true);
        }
        else
            passwordRef.current.style.backgroundColor = normalColor
        
        if(error){
            return false;
        }
        return true;
}
    
};



export default RegisterInput;