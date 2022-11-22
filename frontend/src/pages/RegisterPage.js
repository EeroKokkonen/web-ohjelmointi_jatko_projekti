import RegisterInput from "../components/RegisterInput";
import "./css/RegisterPage.css"

const RegisterPage = () => {


    return <div className="pageContainer">
        <div className="inputContainer">
            <RegisterInput buttonText={"Rekisteröidy"}/>
        </div>

    </div>
};

export default RegisterPage;