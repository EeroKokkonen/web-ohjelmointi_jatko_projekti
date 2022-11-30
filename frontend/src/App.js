import './App.css';
import Navbar from "./components/Navbar.js";
import {Navigate,Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FoodmenuPage from "./pages/FoodmenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage"
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import useToken from "./hooks/UseToken";



function App() {
  // Custom react hook
  const {token, setToken} = useToken("");

   // Jos käyttäjä ei ole kirjautunut, eli tokeni löytyy storagesta
  if (token){
    return (
      <div className='appi'>
        <Navbar />
        <Routes>
          <Route path="/" element={ <MainPage /> } exact />
          <Route path="/menu" element={ <FoodmenuPage /> } />
          <Route path="/orders" element={ <OrdersPage /> } />
          <Route path="/profile" element={ <ProfilePage /> } />
          <Route path="/cart" element={ <CartPage /> } />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </div>
    );
  };

  // Jos käyttäjä ei ole kirjautunut, eli tokenia ei löydy storagesta
  if(!token){
    return (
      <div className='appi'>
        <Navbar />
        <Routes>
          <Route path="/" element={ <MainPage /> } exact />
          <Route path="/menu" element={ <FoodmenuPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </div>
    );
  };
}

export default App;
