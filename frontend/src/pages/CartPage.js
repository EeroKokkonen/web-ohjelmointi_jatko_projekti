import Cart from "../components/Cart";
import "./css/CartPage.css";

const CartPage = () =>{


    return(
        <div>
            <h2 className="PageHeader">Ostoskori</h2>
            <Cart />
            <button className="checkInButton">Kassalle</button>
        </div>
    );
};

export default CartPage;