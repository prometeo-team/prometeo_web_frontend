import './loginPageStyles.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import LoginComponent from '../components/LoginComponent';


const LoginPage = () => {
    return (
        <div className="container">
            <div className="container-content">
                <img src={logoUni} alt="Logo de la Universidad El Bosque" />
                <hr className="image-line" />
                <h1>Facultad De Ingeniería Virtual</h1>
                
            </div>
            <div className="square-container">
                <div className="inner-div">
                    <h1>Bienvenido</h1>
                    <LoginComponent />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
