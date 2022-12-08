import Cart from "../components/Cart";
import "./css/CartPage.css";
import axios from "axios";
import useToken from "../hooks/UseToken";
import {useState} from "react"

const CartPage = () =>{
    const {token} = useToken("");
    const [emptyCart, setEmptyCart] = useState(false);

    const orderCart = async () => {
        let response;
        if(emptyCart){
            alert("Ostoskorisi on tyhjä!");
            return;
        }
        
        try{
            response = await axios.get("https://herkkugrillibackend.eerokokkonen.repl.co/api/products/orderShoppingCart?email=" + token);
            
            window.location.reload();
        } catch (err){
            console.log(response.data);
        }
    };

    return(
        <div>
            <h2 className="PageHeader">Ostoskori</h2>
            <Cart setEmptyCart={setEmptyCart}/>
            <button className="checkInButton" onClick={orderCart}>Kassalle</button>
        </div>
    );
};

export default CartPage;