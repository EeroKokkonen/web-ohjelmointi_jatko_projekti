import RegisterInput from "../components/RegisterInput";
import "./css/RegisterPage.css"

const RegisterPage = () => {


    return <div className="pageContainer">
        <div className="inputContainer">
            <h2>Rekisteröidy</h2>
            <RegisterInput buttonText={"Rekisteröidy"} apiUrl={"api/users/register"}/>
        </div>

    </div>
};

export default RegisterPage;