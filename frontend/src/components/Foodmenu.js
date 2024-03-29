import "./css/Foodmenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const Foodmenu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const {token} = useToken("");
    //Suoritetaan sivunlatauksessa
    const fetchMenu = async () => {
        //Haetaan backendistä data
        try{
            const response = await axios.get("https://herkkugrillibackend.eerokokkonen.repl.co/api/products/getMenu");
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
            //console.log(response);
            console.log("HAKU TEHTIIN")
        } catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    //mapataan array muuttujaan
    let listFoods = foodItems.map((food) =>
        <div className="food" key={food.name}>
            <h2>{food.name}</h2>
            <button type="button" className="cartButton" onClick={() => addToCart(food)}>Lisää ostoskoriin</button>
            <p className="price">{food.price} €</p> 
        </div>
    );

    let addToCart = async (food) => {
        if(token === null){
            alert("Kirjaudu sisään!")
            return
        }
        try{
            const response = await axios.post("https://herkkugrillibackend.eerokokkonen.repl.co/api/products/addProductToShoppingCard", {
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

export default Foodmenu;