import Input from "./Input"
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';




const RegisterInput = ({buttonText, userProfile, apiUrl}) => {

    const navigate = useNavigate();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    let isProfile = false;
    
    if(userProfile){
        isProfile = true;
    } else{
        console.log("Else")
        userProfile = {
            firstname: "",
            lastname: "",
            address: "",
            email: "",
            password: ""
        };
    }
    

    const [errorText, setErrorText] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Tarkistaa onko kaikissa syötteissä jotain, jos jokin on tyhjänä, se ilmoitaa siitä
        if (!checkError())
            return;
        
        // Luo käyttäjälle objektin
        const user = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            address:addressRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        // Lähettää objektin backendiin, jotta sen voi tallentaa databaseen
        try{
            const response = await axios.post(apiUrl, user);
            navigate("/");
        } catch(err){
            setErrorText("Käyttäjän luonti epäonnistui. Yritä myöhemmin uudestaan.");
        }
    }

    return <form onSubmit={handleSubmit} className="registerInputContainer" >
        <p className="errorText">{errorText}</p>
        <Input label={"Etunimi"} ref={firstnameRef} value={userProfile.firstname}/>
        <Input label={"Sukunimi"} ref={lastnameRef} value={userProfile.lastname}/>
        <Input label={"Osoite"} ref={addressRef} value={userProfile.address}/>
        <Input label={"Sähköposti"} ref={emailRef} value={userProfile.email} type={"email"} disabled={isProfile}/>
        <Input label={"Salasana"} type={"password"} value={userProfile.password} ref={passwordRef}/>
        <button className="btn" type="submit">{buttonText}</button>
        <button className="btn" onClick={() => {navigate(-1)}}>Peruuta</button>
    </form>





    function checkError(){
        // Tarkistaa, jos jokin syötteistä on tyhjänä
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