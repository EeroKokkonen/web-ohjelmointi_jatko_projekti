// Ehkä joku alikomponentti vielä??
import "./css/Foodmenu.css";
import { useEffect } from "react";
import axios from "axios";

const Foodmenu = () => {
    const foodItems = [
        {name:"Hampurilainen", price:"8,20"},
        {name:"Juustohampurilainen", price:"9,00"}
    ];
    
    let listFoods = foodItems.map((food) =>
        <div className="food">
            <h2>{food.name}</h2>
            <button type="button" className="cartButton" onClick={() => addToCart()}>Lisää ostoskoriin</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    let addToCart = () => {
        
    }

    const fetchMenu = () => {
        const response = axios.get("api/users/getMenu");
        console.log(response);
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    return(
        <div>
            <section>{listFoods}</section>
        </div>
    );
};

export default Foodmenu;