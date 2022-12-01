import "./css/Foodmenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const Cart = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const {token} = useToken("");
    const [priceSum, setPriceSum] = useState(0);

    //Suoritetaan sivunlatauksessa
    const fetchCart = async () => {
        let sum = 0;
        //Haetaan backendistä data
        const response = await axios.get("api/products/getShoppingCart/" + token);

        if (response.data.length === 0){
            props.setEmptyCart(true);
        }
        const fetchedFoods = [];
        //Muunnetaan data array muotoon ja määritetään foodItemsin sisältö
        for (const key in response.data){
            fetchedFoods.push({
                id: key,
                name: response.data[key].name,
                price: response.data[key].price,
            });
        }

        for (const key in fetchedFoods) {
            sum += fetchedFoods[key].price;
        }
        
        setPriceSum(sum);
        setFoodItems(fetchedFoods);
    }

    useEffect(() => {
        fetchCart();
    }, [])

    //mapataan array muuttujaan
    let listFoods = foodItems.map((food) =>
        <div className="food" key={food.id}>
            <h2>{food.name}</h2>
            <button type="button" className="deleteButton" onClick={() => deleteFromCart(food)}>Poista</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    const deleteFromCart = async (food) => {
        let response;
        try{
            response = await axios.delete("api/products/deleteProductFromShoppingCart?email=" + token + "&productId=" + food.id);
            console.log(response.data);
            alert("Tuote poistettu ostoskortista!");
            window.location.reload();
            
        } catch (err){
            console.log(response.data);
            alert("Tuotetta ei voitu poistaa ostoskorista.\n Yritä myöhemmin uudelleen");
        }
        
    };

    

    return(
        <div>
            <section>{listFoods}</section>
            <div className="sumBack">
                <p className="sum">Yhteensä: { priceSum } €</p>
            </div>
            
        </div>
    );
};

export default Cart;