// Ehkä joku alikomponentti vielä??
import "./css/Foodmenu.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Foodmenu = () => {
    const [foodItems, setFoodItems] = useState([]);

    //Suoritetaan sivunlatauksessa
    const fetchMenu = async () => {
        //Haetaan backendistä data
        const response = await axios.get("api/products/getMenu");
        const fetchedFoods = [];

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
            <button type="button" className="cartButton" onClick={() => addToCart()}>Lisää ostoskoriin</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    let addToCart = () => {

    }

    return(
        <div>
            <section>{listFoods}</section>
        </div>
    );
};

export default Foodmenu;