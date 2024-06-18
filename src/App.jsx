
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage, 
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
          RegistrationRefundPage } from './pages';
import { NavbarComponent } from './components';


function App() {

  const menuStudent = [
    { name: 'Inicio', path: '/' },
    { name: 'Mis Solicitudes', path: '/student/mis-solicitudes' },
    { name: 'Crear Solicitud', path: '/student/crear-solicitud' },
    { name: 'Otras Solicitudes',path: '/student/solicitud-otra' },
    { name: 'Ayuda' }
  ];

  const menuManagement = [
    { name: 'Gestión Solicitudes', path: '/admin/dashboard' },
    { name: 'Consejo Facultad', path: '/admin/consejo-tabla' },
    { name: 'Grados', path: '/admin/grados-tabla' },
    { name: 'Configuración', path: '/admin/config' },
  ];

  const location = useLocation();


  const showNavbar = () => {
    return location.pathname !== '/login';
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
  // Función para obtener el menú según el tipo de usuario
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
  return (
    <>
      {/* <div >
        <NavbarComponent menuItems={menuItems} />
      </div> */}

      {/* //con tailwind crea dos div uno que ocupe 25% y otro 75% */}

      <div className="flex h-full">
        {/* Renderiza NavbarComponent solo si showNavbar es true */}
        {showNavbar() && (
          <div className="w-1/4">
            <NavbarComponent menuItems={getMenu()} />
          </div>
        )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student/crear-solicitud" element={<CreateRequestPage />} />
            <Route path="/student/mis-solicitudes" element={<StudentRequestPage />} />
            <Route path="/student/mi-solicitud" element={<InfoRequestPage />} />
            <Route path="/student/legalizacion-matricula" element={<RegistrationLegalizationPage />} />
            <Route path="/student/reintegro" element={<RegistrationReEnroolmentPage />} />
            <Route path="/student/reembolso" element={<RegistrationRefundPage />} />
            <Route path="/admin/dashboard" element={<InfoAdminRequestPage />} />
            <Route path="/admin/consejo-tabla" element={<CouncilTablePage />} />
            <Route path="/admin/consejo-facultad" element={<CouncilFacultyPage />} />
            <Route path="/admin/solicitud" element={<InfoAdminSRequestPage />} />
            <Route path="/admin/grados-tabla" element={<DegreeTablePage />} />
            <Route path="/student/solicitud-incapacidad" element={<IncapacityPage />} />
            <Route path="/student/solicitud-supletorio" element={<ExtensionPage />} />
            <Route path="/student/solicitud-otra" element={<OtherRequestPage />} />
            <Route path="/student/solicitud-adicion" element={<RegistrationAdditionPage />} />
            <Route path="/student/solicitud-cancelacion" element={<RegistrationCancelPage />} />
            <Route path="/student/postulacion-grado" element={<RegistrationDegreePage />} />
            <Route path="/admin/config" element={<ConfigDatePage />} />
          </Routes>
      </div>
    </>
  )
}

export default App
