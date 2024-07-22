import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import {
  HomePage,
  LoginPage,
  StudentRequestPage,
  CreateRequestPage,
  InfoRequestPage,
  InfoAdminRequestPage,
  RegistrationLegalizationPage,
  CouncilTablePage,
  IncapacityPage,
  ExtensionPage,
  OtherRequestPage,
  CouncilFacultyPage,
  RegistrationReEnroolmentPage,
  RegistrationAdditionPage,
  InfoAdminSRequestPage,
  RegistrationCancelPage,
  DegreeTablePage,
  RegistrationDegreePage,
  ConfigDatePage,
  RegistrationRefundPage,
  RegistrationSlotActivationPage,
  RegistrationReservationPage,
  HistoryCouncil,
  Error404Page
} from './pages';
import { NavbarComponent } from './components';

function App() {
  const [role, setRole] = useState(null);
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);
  const location = useLocation();

  const menuStudent = [
    { name: 'Inicio', path: '/' },
    { name: 'Mis Solicitudes', path: '/student/mis-solicitudes' },
    { name: 'Crear Solicitud', path: '/student/crear-solicitud' },
    { name: 'Otras Solicitudes', path: '/student/solicitud-otra' },
    { name: 'Ayuda' }
  ];

  const menuManagement = [
    { name: 'Inicio', path: '/' },
    { name: 'Gestión Solicitudes', path: '/admin/dashboard' },
    { name: 'Consejo Facultad', path: '/admin/consejo-facultad' },
    { name: 'Grados', path: '/admin/grados-tabla' },
    { name: 'Configuración', path: '/admin/config' },
  ];

  const showNavbar = () => {
    const noNavbarRoutes = ['/login', '/', '/home'];
    const pathname = location.pathname;

    const isNoNavbarRoute = noNavbarRoutes.includes(pathname);

    const isNotFoundRoute = !['/login', '/', '/home', '/student/crear-solicitud', '/student/mis-solicitudes', '/student/mi-solicitud', '/student/legalizacion-matricula', '/student/reintegro', '/student/reembolso', '/student/activacion-cupo', '/student/reserva', '/admin/dashboard', '/admin/consejo-tabla', '/admin/consejo-facultad', '/admin/solicitud', '/admin/grados-tabla', '/student/solicitud-incapacidad', '/student/solicitud-supletorio', '/student/solicitud-otra', '/student/solicitud-adicion', '/student/solicitud-cancelacion', '/student/postulacion-grado', '/admin/config', '/admin/historial-consejo'].includes(pathname) && pathname !== '*';

    return !(isNoNavbarRoute || isNotFoundRoute);
  };

  const getUserType = () => {
    const path = location.pathname;
    if (path.startsWith('/student')) {
      return 1; // Estudiante
    } else if (path.startsWith('/admin')) {
      return 2; // Administrador
    } else {
      return 0; // Otro tipo de usuario
    }
  };

  const getMenu = () => {
    const userType = getUserType();
    if (userType === 1) {
      return menuStudent;
    } else if (userType === 2) {
      return menuManagement;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log('Token:', token);
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.authorities.includes('ROLE_STUDENT')) {
          setRole('ROLE_STUDENT');
        } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
          setRole('ROLE_ADMIN');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setIsTokenProcessed(true);
  }, []);

  const ProtectedRoute = ({ roleRequired, children }) => {
    if (!isTokenProcessed) {
      return <div>Loading...</div>;
    }
    if (!role) {
      return <Navigate to="/login" />;
    } else if (role !== roleRequired) {
      return <Navigate to="/" />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    roleRequired: PropTypes.string.isRequired, 
    children: PropTypes.node.isRequired,
  };


  return (
    <div className="flex h-full">
      {showNavbar() && (
        <div className="w-1/4">
          <NavbarComponent menuItems={getMenu()} />
        </div>
      )}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/student/crear-solicitud" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <CreateRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/mis-solicitudes" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <StudentRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/mi-solicitud" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <InfoRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/legalizacion-matricula" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationLegalizationPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reintegro" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationReEnroolmentPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reembolso" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationRefundPage />
          </ProtectedRoute>
        } />
        <Route path="/student/activacion-cupo" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationSlotActivationPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reserva" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationReservationPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <InfoAdminRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/consejo-tabla" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <CouncilTablePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/consejo-facultad" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <CouncilFacultyPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/solicitud" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <InfoAdminSRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/grados-tabla" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <DegreeTablePage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-incapacidad" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <IncapacityPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-supletorio" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <ExtensionPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-otra" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <OtherRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-adicion" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationAdditionPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-cancelacion" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationCancelPage />
          </ProtectedRoute>
        } />
        <Route path="/student/postulacion-grado" element={
          <ProtectedRoute roleRequired="ROLE_STUDENT">
            <RegistrationDegreePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/config" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <ConfigDatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/historial-consejo" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <HistoryCouncil />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
