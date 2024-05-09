import { Link } from 'react-router-dom';

const HomePage = () => {


    return (
        <div>
            <div>
                <h1>Home Page</h1>
                <Link to="/login">
                    <button>Ir a la página de inicio de sesión</button>
                </Link>
            </div>
            <Link to="/crear-solicitud">
                <button>Crear Solicitud</button>
            </Link>

        </div>
    );
}

export default HomePage;
