import RegisterInput from "../components/RegisterInput";
import "./css/ProfilePage.css"
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/UseToken";

const ProfilePage = () => {
    const {token, setToken} = useToken("");
    const [userProfile, setUserProfile] = useState({});

    const fetchProfile = async () => {
        try{
            const response = await axios.get("api/users/getProfile/" + token);
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
                    <RegisterInput buttonText={"Tallenna"} userProfile={userProfile}/>
                </div>
                <div className="profileLeft">
                    <button className="orderButton">Tilaukset</button>
                    <button className="orderButton">Ostoskori</button>
                </div>
            </div>
        </>
    );


    
}

export default ProfilePage;