import "./css/Foodmenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const Cart = () => {
    const [foodItems, setFoodItems] = useState([]);
    const {token, setToken} = useToken("");

    //Suoritetaan sivunlatauksessa
    const fetchMenu = async () => {
        //Haetaan backendistä data
        const response = await axios.get("api/products/getShoppingCart");
        const fetchedFoods = [];
        console.log(response);
        //Muunnetaan data array muotoon ja määritetään foodItemsin sisältö
        for (const key in response.data){
            fetchedFoods.push({
                id: key,
                name: response.data[key].name,
                price: response.data[key].price,
            });
        }
        setFoodItems(fetchedFoods);
        console.log(fetchedFoods);
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    //mapataan array muuttujaan
    let listFoods = foodItems.map((food) =>
        <div className="food" key={food.name}>
            <h2>{food.name}</h2>
            <button type="button" className="deleteButton" onClick={() => addToCart(food)}>Poista</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    let addToCart = async (food) => {
        
        try{
            const response = await axios.post("api/products/addProductToShoppingCard", {
                product: food,
                email: token,
            });
            alert("Tuote lisätty ostoskoriin!");
        } catch (err){
            console.log("Virhe: " + err);
            alert("Tuotetta ei voitu lisätä ostoskortiin.\n Yritä myöhemmin uudelleen");
        }
        
    };

    return(
        <div>
            <section>{listFoods}</section>
        </div>
    );
};

export default Cart;