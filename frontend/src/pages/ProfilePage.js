import RegisterInput from "../components/RegisterInput";
import "./css/ProfilePage.css"
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";
import {useNavigate} from 'react-router-dom';

const ProfilePage = () => {
    const {token, setToken} = useToken("");
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try{
            const response = await axios.get("https://herkkugrillibackend.eerokokkonen.repl.co/api/users/getProfile/" + token);
            const profile = response.data;

            setUserProfile({
                firstname: profile.firstname,
                lastname: profile.lastname,
                address:profile.address,
                email: profile.email,
                password: profile.password,
            });

        } catch(err){
            alert("Profiilia ei löytynyt...");
        }
    };

    useLayoutEffect(() => {
        fetchProfile();
    }, [])

    return(
        <>
            <div className="profileContainer">
                <h2>Profiili</h2>
                <div className="profileRight">
                    <h3>Muokkaa profiilia</h3>
                    <RegisterInput buttonText={"Tallenna"} userProfile={userProfile} apiUrl={"https://herkkugrillibackend.eerokokkonen.repl.co/api/users/updateProfile"}/>
                </div>
                <div className="profileLeft">
                    <button className="orderButton" onClick={() => {navigate("/orders")}}>Tilaukset</button>
                    <button className="orderButton" onClick={() => {navigate("/cart")}}>Ostoskori</button>
                </div>
            </div>
        </>
    );


    
}

export default ProfilePage;