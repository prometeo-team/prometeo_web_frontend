
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, StudentRequestPage, CreateRequestPage, InfoRequestPage, RegistrationLegalizationPage } from './pages';

function App() {


  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-solicitud" element={<CreateRequestPage />} />
        <Route path="/mis-solicitudes" element={<StudentRequestPage />} />
        <Route path="/mi-solicitud" element={<InfoRequestPage />} />
        <Route path="/legalizacion-matricula" element={<RegistrationLegalizationPage />} />
      </Routes>
    </>
  )
}

export default App
