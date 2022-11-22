import MainPage from "./pages/MainPage";
import FoodmenuPage from "./pages/FoodmenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="appi">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />}exact />
        <Route path="/menu" element={<FoodmenuPage />}exact />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
