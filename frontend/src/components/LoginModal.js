import Input from "./Input.js";
import { useRef } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken"

const LoginModal = (props) => {
  const {token, setToken} = useToken("");
  const userName = useRef();
  const password = useRef();
  const errorColor = "rgba(255, 0, 30, 0.3)";
  const normalColor = "rgba(0, 0, 0, 0.7)";

  const logInHandler = async (event) =>{
    event.preventDefault();
    //Syötteen tarkistus, jos on tyhjät kentät
    if(userName.current.value === ""){
      userName.current.style.backgroundColor = errorColor;
    }else{
      userName.current.style.backgroundColor = normalColor;
    }
    if(password.current.value === ""){
      password.current.style.backgroundColor = errorColor;
    }else{
      password.current.style.backgroundColor = normalColor;
    }

    const user = {
      email: userName.current.value,
      password: password.current.value,
    };

    try {
      // Lähettää sähköpostin ja salasanan backendiin, jos käyttäjä löytyy kirjautuu sisälle
      const response = await axios.post("https://herkkugrillibackend.eerokokkonen.repl.co/api/users/login", user);
      console.log(response.data);
      const token = response.data;
      setToken(token);
      window.location.reload();
    } catch (err) {
      // Jos käyttäjää ei löydy, vaihtaa inputin väriä
      console.log(err);
      userName.current.style.backgroundColor = errorColor;
      password.current.style.backgroundColor = errorColor;
    }
  };

    return (
      <form className="modal" onSubmit={logInHandler}>
        <p>Kirjaudu</p>
        <Input label={"Sähköposti"} type={"email"} ref={userName}/>
        <Input label={"Salasana"} type={"password"} ref={password}/>
        <a href="/register" id="registerLink">Rekisteröidy</a>
        <button className="btn" type="submit">Confirm</button>
        <button className="btn btn--alt" onClick={props.onCancel}>Cancel</button>
      </form>
    );
  };
  
  export default LoginModal;