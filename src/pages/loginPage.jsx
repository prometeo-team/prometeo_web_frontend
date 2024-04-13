import './loginPageStyles.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import LoginComponent from '../components/LoginComponent';

const LoginPage = () => {
    return (
        <div>
            <div className="containerLogin">
                <div className="container-content">
                    <div className="flex justify-center items-center">
                        <img src={logoUni} alt="Logo de la Universidad El Bosque" className="img-logo-u" />
                    </div>
                    <hr className="image-line" />
                    <h1 className='h1Login'>Facultad De Ingeniería Virtual</h1>
                </div>
                <div className="square-container">
                    <div className="flex flex-col items-center h-full">
                        <div>
                            <h1 className='h1Login'>Bienvenido</h1>
                        </div>
                        <div className="flex justify-center items-center h-full">
                            <LoginComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
