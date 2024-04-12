import './loginPageStyles.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import LoginComponent from '../components/LoginComponent';


const LoginPage = () => {
    return (
        <div>
            <div className="container">
                <div className="container-content">
                    <div className="img-container">
                        <img src={logoUni} alt="Logo de la Universidad El Bosque" className="img-logo" />
                    </div>
                    <hr className="image-line" />
                    <h1 className='h1Login'>Facultad De Ingeniería Virtual</h1>

                </div>
                <div className="square-container">
                    <div className="inner-div">
                        <h1 className='h1Login'>Bienvenido</h1>
                        <LoginComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
