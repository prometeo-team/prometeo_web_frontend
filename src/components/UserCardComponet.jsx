import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import './UserCardComponent.css';
import { Link } from 'react-router-dom';

function UserCardComponent({ number }) {
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Primera notificación' },
        { id: 2, message: 'Segunda notificación' },
        { id: 3, message: 'Tercera notificación' },
        { id: 4, message: 'Cuarta notificación' }
    ]);

    const notificationRef = useRef(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            try {
                const base64Url = storedToken.split('.')[1];
                if (!base64Url) throw new Error('Invalid token');
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const decodedToken = JSON.parse(jsonPayload);

                if (!decodedToken.sub) throw new Error('No "sub" field in token');

                setUser(decodedToken.sub);
                setToken(storedToken);
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        }

        // Cierra la lista si se hace clic fuera de ella
        /*function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };*/
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setUser('');
        setToken(null);
        window.location.reload();
    };

    const toggleNotifications = () => {
        console.log(showNotifications);
        if(showNotifications==true){
            setShowNotifications(false);
        }else if(showNotifications==false){
            setShowNotifications(true);
        }
    };

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    let notificationIcon = null;
    if (number > 1) {
        notificationIcon = <div className={classNames('w-5 h-5 rounded-full text-center bg-red-600 -ml-3 text-white')}><span>{number}</span></div>;
    }

    return (
        <>
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="stylesheet"></link>
            <div className={classNames('flex flex-row justify-end mr-4')}>
                {token ? (
                    <>
                        <div className={classNames('mt-2 text_font w-53 rounded-full flex flex-row justify-center p-6 text-center font bg-white')}>
                            <span>{user}</span>
                            <FaUserCircle className={classNames('w-6 h-6')} />
                        </div>
                        <div className={classNames('relative flex flex-row items-end ml-3')}>
                            <IoNotifications onClick={toggleNotifications} className={classNames('h-full w-8 cursor-pointer')} title="Notificaciones" />
                            {notificationIcon}
                            {showNotifications && (
                                <div 
                                    ref={notificationRef} 
                                    className="absolute right-0 w-64 bg-white shadow-lg rounded-lg p-4 animate-dropdown"
                                    style={{
                                        top: 'calc(100% + 10px)', // Debajo de la campana
                                        maxHeight: '200px',       // Altura fija
                                        overflowY: 'auto',        // Scroll si es necesario
                                        zIndex: 10                // Para asegurarse que esté por encima
                                    }}>
                                    <h3 className="text-lg font-bold mb-2 text-black">Notificaciones</h3>
                                    <ul>
                                        {notifications.length > 0 ? (
                                            notifications.map(notification => (
                                                <li key={notification.id} className="flex justify-between items-center mb-2 text-black">
                                                    <span>{notification.message}</span>
                                                    <button
                                                        onClick={() => handleDeleteNotification(notification.id)}
                                                        className="bg-red-500 text-white p-1 rounded-full">
                                                        X
                                                    </button>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-black">No tienes notificaciones</li>
                                        )}
                                    </ul>
                                </div>
                            )}
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
