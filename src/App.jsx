
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, StudentRequestPage, CreateRequestPage, InfoRequestPage, InfoAdminRequestPage, RegistrationLegalizationPage, CouncilTablePage } from './pages';
import { NavbarComponent } from './components';


function App() {

  const menuItems = [
    { name: 'Inicio' },
    { name: 'Mis Solicitudes' },
    { name: 'Crear Solicitud' },
    { name: 'Calendario Académico' },
    { name: 'Otras Solicitudes' },
    { name: 'Ayuda' }
  ];

  return (
    <>
      {/* <div >
        <NavbarComponent menuItems={menuItems} />
      </div> */}

      {/* //con tailwind crea dos div uno que ocupe 25% y otro 75% */}

      <div className="flex">
        <div className="w-1/4 h-max">
          <NavbarComponent menuItems={menuItems} />
        </div>
        <div className="w-3/4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/mis-solicitudes" element={<ViewRequest />} /> 
            <Route path="/gestionar-solicitudes" element={<RequestManagement />} /> */}
            <Route path="/crear-solicitud" element={<CreateRequestPage />} />
            <Route path="/mis-solicitudes" element={<StudentRequestPage  />} />
            <Route path="/mi-solicitud" element={<InfoRequestPage />} />
            <Route path="/legalizacion-matricula" element={<RegistrationLegalizationPage />} />
            <Route path="/dashboard" element={<InfoAdminRequestPage />} />
            <Route path="/consejo-tabla" element={<CouncilTablePage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
