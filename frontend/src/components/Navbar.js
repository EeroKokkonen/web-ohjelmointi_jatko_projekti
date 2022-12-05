import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./LoginModal";
import "./css/Navbar.css";
import Backdrop from "./Backdrop";
import useToken from "../hooks/UseToken";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const {token, setToken} = useToken("");
  
  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };
  // Katsoo onko käyttäjä kirjautunut ja asettaa navbarin sen mukaan
  if(token){
    return (
      <header className="header">
        <Link to="/" id="logo">HerkkuGrilli</Link>
        <nav>
          <ul> 
            <li>
              <Link to="/menu">Menu</Link>
            </li>
              <li>
                <Link to="/orders">Tilaukset</Link>
              </li>
              <li>
                <Link to="/cart">Ostoskori</Link>
              </li>
              <li>
                <Link to="/profile">Profiili</Link>
              </li>
              <li>
                <Link onClick={() => {localStorage.removeItem("token"); window.location.reload();}}>Kirjaudu ulos</Link>
              </li>
          </ul>
        </nav>
        {showModal && <Modal onCancel={cancelModalHandler} />}
        {showModal ? <Backdrop onClick={cancelModalHandler} /> : null}
      </header>
    );
  }
  if (!token){
    return (
      <header className="header">
        <Link to="/" id="logo">HerkkuGrilli</Link>
        <nav>
          <ul> 
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link onClick={showModalHandler}>Kirjaudu</Link>
            </li>
          </ul>
        </nav>
        {showModal && <Modal onCancel={cancelModalHandler} />}
        {showModal ? <Backdrop onClick={cancelModalHandler} /> : null}
      </header>
    );
  }
};

export default Navbar;