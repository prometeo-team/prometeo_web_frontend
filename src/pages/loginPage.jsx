import './loginPageStyles.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import LoginComponent from '../components/LoginComponent';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';


const LoginPage = () => {
    return (
        <div className="containerLogin h-full w-full flex flex-col md:flex-row md:justify-center md:items-center">
            <div className="container-content w-full md:w-1/2">
                <div className="flex justify-center items-center">
                    <img
                        src={logoUni}
                        alt="Logo de la Universidad El Bosque"
                        className="img-logo-u w-full max-w-xs mx-auto"
                    />
                </div>
                <hr className="image-line" />
                <h1 className='h1Login '>Facultad De Ingeniería Virtual</h1>
            </div>
            <div className="square-container p-6 rounded-lg w-full md:w-1/2 mt-6 md:mt-0">
                <div className="flex flex-col items-center h-full">
                    <div className="flex justify-start w-full mb-5">
                        <Link to='/'>
                            <button className='w-40 h-5 font-bold text-lg flex items-center text-white'>
                                <IoIosArrowBack className="h-7 w-7" />
                                <span className="ml-2">Volver</span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <h1 className='h1Login text-center'>Bienvenido</h1>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        <LoginComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;