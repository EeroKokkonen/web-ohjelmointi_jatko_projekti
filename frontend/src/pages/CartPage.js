import Cart from "../components/Cart";
import "./css/CartPage.css";
import axios from "axios";
import useToken from "../hooks/UseToken";

const CartPage = () =>{
    const {token} = useToken("");

    const orderCart = async () => {
        let response;
        try{
            console.log(token)
            response = await axios.get("api/products/orderShoppingCart?email=" + token);
            console.log(response.data);
            window.location.reload();
        } catch (err){
            console.log(response.data);
        }
    };

    return(
        <div>
            <h2 className="PageHeader">Ostoskori</h2>
            <Cart />
            <button className="checkInButton" onClick={orderCart}>Kassalle</button>
        </div>
    );
};

export default CartPage;