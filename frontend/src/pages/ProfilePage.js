import RegisterInput from "../components/RegisterInput";
import "./css/ProfilePage.css"

const ProfilePage = () => {
    return(
        <>
            <div className="profileContainer">
                <h2>Profiili</h2>
                <div className="profileLeft">
                    <p>Muokkaa profiilia</p>
                    <RegisterInput buttonText={"Tallenna"}/>
                </div>
                <div className="profileRight">
                    <button className="orderButton">Tilaukset</button>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;