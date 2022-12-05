import "./css/OrderList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const {token} = useToken("");

    //Suoritetaan sivunlatauksessa
    const fetchOrders = async () => {
        //Haetaan backendistä data
        const response = await axios.get("api/products/getOrders?email=" + token);
        setOrderList(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const priceCounter = (order) =>{
        let sum = 0;
        for (const i in order.productOrder){
            sum += order.productOrder[i].price
        }
        return(
            sum
        )
    }

    let listOfOrderedFoods = orderList.map((order) =>
        <div className="OrderContainer" key={order.date}>
            <h1>Tilattu: <p className="date">{order.date}</p></h1>
            
                {order.productOrder.map((product) =>
                    <p className="productName" key={product.id}>{product.name}</p> 
                )}
                <p className="sumLabel">Tilauksen summa: </p>
                <p className="priceSum">{priceCounter(order)} €</p>
        </div>
    )

    return(
        <div >
            <section>{listOfOrderedFoods}</section>
        </div>
    );
};

export default OrderList;