import RegisterInput from "../components/RegisterInput";
import "./css/ProfilePage.css"

const ProfilePage = () => {
    return(
        <>
            <div className="profileContainer">
                <h2>Profiili</h2>
                <div className="profileRight">
                    <h3>Muokkaa profiilia</h3>
                    <RegisterInput buttonText={"Tallenna"}/>
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