import Input from "./Input.js";
import { useRef } from "react";

const Modal = (props) => {

  const userName = useRef();
  const password = useRef();
  const errorColor = "rgba(255, 0, 30, 0.3)";
  const normalColor = "rgba(0, 0, 0, 0.7)";

  const logInHandler = () =>{
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
  };

    return (
      <div className="modal">
        <p>Kirjaudu</p>
        <Input label={"Sähköposti"} type={"email"} ref={userName}/>
        <Input label={"Salasana"} type={"password"} ref={password}/>
        <a href="/register" id="registerLink">Rekisteröidy</a>
        <button className="btn" onClick={logInHandler}>Confirm</button>
        <button className="btn btn--alt" onClick={logInHandler}>Cancel</button>
      </div>
    );
  };
  
  export default Modal;