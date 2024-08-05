import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from 'react';
import './UserCardComponent.css';
import { Link } from 'react-router-dom';

function UserCardComponent({ number }) {
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Recupera el token desde sessionStorage
        const storedToken = sessionStorage.getItem('token');
        console.log('Token recuperado:', storedToken);

        if (storedToken) {
            try {
                // Divide el token en sus tres partes: header, payload, y signature
                const base64Url = storedToken.split('.')[1];
                if (!base64Url) throw new Error('Invalid token');

                // Reemplaza los caracteres no válidos en Base64
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

                // Decodifica el Base64
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                // Parsea el JSON
                const decodedToken = JSON.parse(jsonPayload);
                console.log('Token decodificado:', decodedToken);

                // Verifica que el campo 'sub' esté presente en el token decodificado
                if (!decodedToken.sub) throw new Error('No "sub" field in token');

                setUser(decodedToken.sub);
                setToken(storedToken);
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setUser('');
        setToken(null);
        console.log('Sesión cerrada y sessionStorage borrado');
        window.location.reload();
    };
    
    let notification = null;

    if (number > 1) {
        notification = <div className={classNames('w-5 h-5 rounded-full text-center bg-red-600 -ml-3 text-white')}><span>{number}</span></div>;
    }

    return (
        <>
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="stylesheet"></link>
            <div className={classNames('flex flex-row justify-end')}>
                {token ? (
                    <>
                        <div className={classNames('mt-2 text_font w-53 rounded-full flex flex-row justify-center p-6 text-center font bg-white')}>
                            <span>{user}</span>
                            <FaUserCircle className={classNames('w-6 h-6')} />
                        </div>
                        <div className={classNames('flex flex-row items-end ml-3')}>
                            <IoNotifications className={classNames('h-full w-8 cursor-pointer')} title="Notificaciones" />
                            {notification}
                        </div>
                        <div className="mt-2 text_font flex items-center justify-center">
                            <button onClick={handleLogout} className="bg-[#43737e] text-white font-bold rounded-full w-12 h-12 mt-4 flex items-center justify-center hover:bg-red-900 transition-colors duration-300 ml-2"
                                title="Cerrar sesión">
                                <MdLogout className="h-6 w-6" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="mt-2 text_font flex items-center justify-center">
                        <Link to="/login" className="inline-block">
                            <button
                                className="bg-[#97b749] text-white font-bold rounded-full px-4 py-2 mb-1.5 border border-transparent  hover:bg-[#43737e] hover:border-white hover:text-white transition-colors duration-300"
                                title="Iniciar sesión">
                                Iniciar sesión
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

UserCardComponent.propTypes = {
    number: PropTypes.number.isRequired,
};

export default UserCardComponent;
