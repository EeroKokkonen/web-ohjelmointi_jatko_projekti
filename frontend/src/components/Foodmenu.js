// Ehkä joku alikomponentti vielä??
import "./css/Foodmenu.css";

const Foodmenu = () => {
    const foodItems = [
        {name:"Hampurilainen", price:"8,20"},
        {name:"Juustohampurilainen", price:"9,00"}
    ];
    
    const listFoods = foodItems.map((food) =>
    <div className="food">
        <h2>{food.name}</h2>
        <button type="button" className="cartButton">Lisää ostoskoriin</button>
        <p className="price">{food.price} €</p> 
    </div>
    
    );

    return(
        <div>
            {listFoods}
        </div>
    );
};

export default Foodmenu;