import { useEffect, useState } from 'react';
import UserCardComponent from './UserCardComponet';
import logo from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import './homePageNavbar.css';
import { Link } from 'react-router-dom';

// Función para decodificar el token JWT
const decodeToken = (token) => {
  try {
    // Divide el token en sus tres partes: header, payload, y signature
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error('Invalid token');

    // Reemplaza los caracteres no válidos en Base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decodifica el Base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    // Parsea el JSON
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

const Navbar = () => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    // Recupera el token desde sessionStorage
    const storedToken = sessionStorage.getItem('token');


    if (storedToken) {
      const decodedToken = decodeToken(storedToken);


      if (decodedToken && decodedToken.authorities) {
        setUserRoles(decodedToken.authorities);
      }
    }
  }, []);

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-nav text-white w-full">
      <div className="flex items-center mb-4 sm:mb-0 logo-container">
        <img src={logo} alt="Logo" className="w-auto sm:h-16 sm:w-auto" />
        <h1 className='font-bold ml-4 title'>Facultad de Ingeniería</h1>
      </div>
      <div className="flex flex-wrap items-center space-x-4 justify-center text-center">
        {userRoles.includes('ROLE_STUDENT') && (
          <>
            <Link to="/student/crear-solicitud" className="inline-block">
              <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Crear solicitud</button>
            </Link>
            <Link to="/student/mis-solicitudes" className="inline-block">
              <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Mis solicitudes</button>
            </Link>
          </>
        )}
        {userRoles.includes('ROLE_TEACHER') && (
          <>
            <Link to="/teacher/crear-solicitud" className="inline-block">
              <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Crear solicitud</button>
            </Link>
            <Link to="/teacher/mis-solicitudes" className="inline-block">
              <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Mis solicitudes</button>
            </Link>
          </>
        )}
        {(userRoles.includes('ROLE_ACADEMIC') || userRoles.includes('ROLE_COORDINADORPOS') || userRoles.includes('ROLE_COORDINADORPRE') || userRoles.includes('ROLE_SUBACADEMIC') || userRoles.includes('ROLE_ADMIN') )&& (
          <>
            <Link to="/admin/dashboard" className="inline-block">
              <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Solicitudes</button>
            </Link>
          </>
        )}
        <UserCardComponent  number={2} />
      </div>
    </nav>
  );
};

export default Navbar;
