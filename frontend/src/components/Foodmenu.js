// Ehkä joku alikomponentti vielä??

const Foodmenu = () => {
    const foodItems = [
        {name:"Hampurilainen", price:"8,20e"},
        {name:"Juustohampurilainen", price:"9,00e"}
    ]
    
    const renderListOfFoods = (foods) => {
        return foods.map(name => <h2>{foods.name}</h2>)
    }

    return(
        <div>
            {renderListOfFoods(foodItems)}
        </div>
    );
};

export default Foodmenu;