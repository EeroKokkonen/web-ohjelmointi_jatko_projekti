// Ehkä joku alikomponentti vielä??
import "./css/Foodmenu.css";

const Foodmenu = () => {
    const foodItems = [
        {name:"Hampurilainen", price:"8,20e"},
        {name:"Juustohampurilainen", price:"9,00e"}
    ];
    
    const listFoods = foodItems.map((food) =>
    <div className="food">
        <h2>{food.name}</h2>
        <p>{food.price}</p>
    </div>
    
    );

    return(
        <div>
            {listFoods}
        </div>
    );
};

export default Foodmenu;