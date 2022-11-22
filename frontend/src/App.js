import './App.css';
import Navbar from "./components/Navbar.js";
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FoodmenuPage from "./pages/FoodmenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage"


function App() {
  return (
    <div className='appi'>
      <Navbar />
      <Routes>
        <Route path="/" element={ <MainPage /> } exact />
        <Route path="/menu" element={ <FoodmenuPage /> } />
        <Route path="/orders" element={ <OrdersPage /> } />
        <Route path="/profile" element={ <ProfilePage /> } />

      </Routes>

    </div>
  );
}

export default App;
