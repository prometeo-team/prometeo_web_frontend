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
  Error404Page,
  LegalizationRequestAdmin,
  TraceabilityPage, 
  ValidatePdfPage
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
  const menuTeacher = [
    { name: 'Inicio', path: '/' },
    { name: 'Mis Solicitudes', path: '/teacher/mis-solicitudes' },
    { name: 'Crear Solicitud', path: '/teacher/crear-solicitud' },
    { name: 'Ayuda' }
  ];

  const menuManagement = [
    { name: 'Inicio', path: '/' },
    { name: 'Gestión Solicitudes', path: '/admin/dashboard' },
    { name: 'Consejo Facultad', path: '/admin/consejo-facultad' },
    { name: 'Grados', path: '/admin/grados-tabla' },
    { name: 'Trazabilidad', path: '/admin/Traceability' },
    { name: 'Configuración', path: '/admin/config' },
  ];

  const menucoordinador = [
    { name: 'Inicio', path: '/' },
    { name: 'Gestión Solicitudes', path: '/admin/dashboard' },
    { name: 'Consejo Facultad', path: '/admin/consejo-facultad' },
    { name: 'Grados', path: '/admin/grados-tabla' },
    { name: 'Trazabilidad', path: '/admin/Traceability' }
  ];

  const menucareerS = [
    { name: 'Inicio', path: '/' },
    { name: 'Gestión Solicitudes', path: '/admin/dashboard' },
    { name: 'Grados', path: '/admin/grados-tabla' },
    { name: 'Trazabilidad', path: '/admin/Traceability' },
  ];

  const showNavbar = () => {
    const noNavbarRoutes = ['/login', '/', '/home'];
    const pathname = location.pathname;

    const isNoNavbarRoute = noNavbarRoutes.includes(pathname);

    const isNotFoundRoute = !['/login', '/', '/home', '/admin/Traceability','/student/crear-solicitud', '/teacher/crear-solicitud', '/student/mis-solicitudes', '/teacher/mis-solicitudes','/student/mi-solicitud', '/student/legalizacion-matricula', '/student/reintegro', '/student/reembolso', '/student/activacion-cupo', '/student/reserva', '/admin/dashboard', '/admin/consejo-tabla', '/admin/consejo-facultad', '/admin/solicitud', '/admin/grados-tabla', '/student/solicitud-incapacidad','/teacher/solicitud-incapacidad', '/student/solicitud-supletorio', '/student/solicitud-otra', '/student/solicitud-adicion', '/student/solicitud-cancelacion', '/student/postulacion-grado', '/admin/config', '/admin/historial-consejo','/admin/legalizacion-solicitud' ,'/teacher/mi-solicitud' ].includes(pathname) && pathname !== '*';

    return !(isNoNavbarRoute || isNotFoundRoute);
  };

  

  

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
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
        }else if (decodedToken.authorities.includes('ROLE_DECANO')) {
          setRole('ROLE_DECANO');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setIsTokenProcessed(true);
  }, []);

  const getMenu = () => {
    if (role === "ROLE_STUDENT") {
      return menuStudent;
    }else if (role === "ROLE_TEACHER") {
      return menuTeacher;
    }else if (role === "ROLE_ACADEMIC" || role === "ROLE_SUBACADEMIC" || role === "ROLE_DECANO") {
      return menuManagement;
    }else if(role === "ROLE_COORDINADORPRE" || role === "ROLE_COORDINADORPOS"){
      return menucoordinador;
    }else if(role === "ROLE_ADMIN"){
      return menucareerS;
    }else {
      return [];
    }
  };
  
  const ProtectedRoute = ({ allowedRoles, children }) => {
    if (!isTokenProcessed) {
      return <div>Loading...</div>;
    }
    if (!role) {
      return <Navigate to="/login" />;
    } 
    if (!allowedRoles.includes(role)) {
      console.log("no encontrado");
      console.log("no encontrado");
      return <Navigate to="/" />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, 
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
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <CreateRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/teacher/crear-solicitud" element={
          <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
            <CreateRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/mis-solicitudes" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <StudentRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/teacher/mis-solicitudes" element={
          <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
            <StudentRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/mi-solicitud" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <InfoRequestPage />
          </ProtectedRoute>
        } />
         <Route path="/teacher/mi-solicitud" element={
          <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
            <InfoRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/legalizacion-matricula" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationLegalizationPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reintegro" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationReEnroolmentPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reembolso" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationRefundPage />
          </ProtectedRoute>
        } />
        <Route path="/student/activacion-cupo" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationSlotActivationPage />
          </ProtectedRoute>
        } />
        <Route path="/student/reserva" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationReservationPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <InfoAdminRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/Traceability" element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <TraceabilityPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/consejo-tabla" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <CouncilTablePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/consejo-facultad" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <CouncilFacultyPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/solicitud" element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <InfoAdminSRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/grados-tabla" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_ADMIN","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <DegreeTablePage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-incapacidad" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <IncapacityPage />
          </ProtectedRoute>
        } />
        <Route path="/teacher/solicitud-incapacidad" element={
          <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
            <IncapacityPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-supletorio" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <ExtensionPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-otra" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <OtherRequestPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-adicion" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationAdditionPage />
          </ProtectedRoute>
        } />
        <Route path="/student/solicitud-cancelacion" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationCancelPage />
          </ProtectedRoute>
        } />
        <Route path="/student/postulacion-grado" element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <RegistrationDegreePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/config" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_DECANO"]}>
            <ConfigDatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/historial-consejo" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <HistoryCouncil />
          </ProtectedRoute>
        } />
        <Route path="/admin/legalizacion-solicitud" element={
          <ProtectedRoute allowedRoles={["ROLE_ACADEMIC","ROLE_SUBACADEMIC","ROLE_ADMIN","ROLE_COORDINADORPRE","ROLE_COORDINADORPOS","ROLE_DECANO"]}>
            <LegalizationRequestAdmin />
          </ProtectedRoute>
        } />
        <Route path="/validatePdf/:requestId" element={<ValidatePdfPage />} />

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
