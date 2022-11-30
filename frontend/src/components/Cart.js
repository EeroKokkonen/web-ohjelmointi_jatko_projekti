import "./css/Foodmenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const Cart = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const {token, setToken} = useToken("");
    const [priceSum, setPriceSum] = useState(0);

    //Suoritetaan sivunlatauksessa
    const fetchCart = async () => {
        let sum = 0;
        //Haetaan backendistä data
        const response = await axios.get("api/products/getShoppingCart/" + token);
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
            <button type="button" className="deleteButton" onClick={() => deleteFood(food.id)}>Poista</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    let deleteFood = async (food) => {
        
        
        
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