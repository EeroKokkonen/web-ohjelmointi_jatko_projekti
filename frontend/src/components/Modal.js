import Input from "./Input.js";
import { useRef } from "react";
import axios from "axios";

const Modal = (props) => {

  const userName = useRef();
  const password = useRef();
  const errorColor = "rgba(255, 0, 30, 0.3)";
  const normalColor = "rgba(0, 0, 0, 0.7)";

  const logInHandler = async () =>{
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
      const response = await axios.post("api/users/login", user);
      console.log(response);
      const token = response.data;
      localStorage.setItem('token', JSON.stringify(token));
    } catch (err){
      console.log(err);
      userName.current.style.backgroundColor = errorColor;
      password.current.style.backgroundColor = errorColor;
    }

  };

    return (
      <div className="modal">
        <p>Kirjaudu</p>
        <Input label={"Sähköposti"} type={"email"} ref={userName}/>
        <Input label={"Salasana"} type={"password"} ref={password}/>
        <a href="/register" id="registerLink">Rekisteröidy</a>
        <button className="btn" onClick={logInHandler}>Confirm</button>
        <button className="btn btn--alt" onClick={props.onCancel}>Cancel</button>
      </div>
    );
  };
  
  export default Modal;