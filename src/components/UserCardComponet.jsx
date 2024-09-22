import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import { notification}  from "antd";
import { IoAlertCircleSharp } from "react-icons/io5";
import './UserCardComponent.css';
import { Link, useNavigate,useLocation  } from 'react-router-dom';

function UserCardComponent({ number }) {
    const location = useLocation();
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
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
                if (decodedToken.authorities.includes('ROLE_STUDENT')) {
                    setRole('ROLE_STUDENT');
                  } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
                    setRole('ROLE_ADMIN');
                  }else if (decodedToken.authorities.includes('ROLE_TEACHER')) {
                    setRole('ROLE_TEACHER');
                  }else if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
                    setRole('ROLE_ACADEMIC');
                  }else if (decodedToken.authorities.includes('ROLE_SUBACADEMIC')) {
                    setRole('ROLE_SUBACADEMIC');
                  }else if (decodedToken.authorities.includes('ROLE_COORDINADORPRE')) {
                    setRole('ROLE_COORDINADORPRE');
                  }else if (decodedToken.authorities.includes('ROLE_COORDINADORPOS')) {
                    setRole('ROLE_COORDINADORPOS');
                  }
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchNotification();
        }
    }, [user, location.pathname]); // Esto hará que el fetch se ejecute cada vez que cambies de página
    
    const handleLogout = () => {
        sessionStorage.clear();
        setUser('');
        setToken(null);
        window.location.reload();
    };

    const fetchNotification = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/byUser?userName=${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (response.status === 200) {
                const prevNotification =  result.data.map(notification => ({id: notification.id,message:notification.title,request: notification.requestDetailId}));
                setNotifications(prevNotification);
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const fetchRequest = async (request) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getRequestById?id=${request}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (response.status === 200) {
                const type = result.data.requestTypeEntity.nameType;
                
                return type;
                
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const fetchView = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/markAsRead?notificationId=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (response.status === 200) {
               console.log(result.message);
                
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        fetchView(id);
    };

    const handleClickNotification = async (id,request) => {
        try {
            setNotifications(notifications.filter(notification => notification.id !== id));
            if(request===-1){
                if(role=='ROLE_STUDENT'){
                    navigate(`/student/crear-solicitud`);
                    notification.info({
                        message: 'Importante',
                        description: 'Se ha habilitado la postulación a grados".',
                        placement: 'bottomRight',
                        icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
                    })
                }
            }else{
                var type = await  fetchRequest(request);
                if(role=='ROLE_STUDENT'){
                    navigate(`/student/mi-solicitud?id=${request}&tipo=${type}`);
                }else if(role=='ROLE_ADMIN' || role=='ROLE_ACADEMIC' || role=='ROLE_SUBACADEMIC' || role=='ROLE_COORDINADORPRE' || role=='ROLE_COORDINADORPOS'){
                    if(type=='Legalización de matrícula'){
                        navigate(`/admin/legalizacion-solicitud?id=${request}&tipo=${type}`);
                    }else{
                        navigate(`/admin/solicitud?id=${request}&tipo=${type}`);
                    }
                }else if(role=='ROLE_TEACHER'){
                    navigate(`/teacher/mi-solicitud?id=${request}&tipo=${type}`);
                    
                }
            }
            fetchView(id);
        } catch (error) {
            console.error("Error al manejar la notificación:", error);
        }
       console.log('id: '+id);
       console.log('request: '+ request);

    };

    let notificationIcon = null;
    if (notifications.length >= 1) {
        notificationIcon = <div className={classNames('w-5 h-5 rounded-full text-center bg-red-600 -ml-3 text-white')}><span>{notifications.length}</span></div>;
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
                                        overflowY: 'auto',        // Scroll solo vertical
                                        zIndex: 10,               // Para asegurarse que esté por encima
                                        overflowX: 'hidden'       // Evitar scroll horizontal
                                    }}>
                                    <h3 className="text-lg font-bold mb-2 text-black">Notificaciones</h3>
                                    <ul>
                                        {notifications.length > 0 ? (
                                            notifications.reverse().map(notification => (
                                                <li key={notification.id} className="flex justify-between items-center mb-2  hover:bg-zinc-400 text-black">
                                                    <span onClick={()=>handleClickNotification(notification.id,notification.request)} className="break-words cursor-pointer text-wrap max-w-[75%]">{notification.message}</span> {/* Hacer que el texto se ajuste */}
                                                    <button
                                                        onClick={() => handleDeleteNotification(notification.id)}
                                                        className="bg-red-500 ml-2 text-white p-1 rounded-full">
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
