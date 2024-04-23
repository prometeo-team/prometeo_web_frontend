
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, StudentRequestPage, CreateRequestPage, InfoRequestPage, RequestManagement } from './pages';

function App() {


  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/mis-solicitudes" element={<ViewRequest />}/> */}
        {/* <Route path="/gestionar-solicitudes" element={<RequestManagement/>} /> */}
        <Route path="/crear-solicitud" element={<CreateRequestPage />} />
        <Route path="/mis-solicitudes" element={<StudentRequestPage />} />
        <Route path="/mi-solicitud" element={<InfoRequestPage />} />
      </Routes>
    </>
  )
}

export default App
