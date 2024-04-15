
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, StudentRequestPage, CreateRequestPage } from './pages';


function App() {


  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-solicitud" element={<CreateRequestPage />} />
        <Route path="/mis-solicitudes" element={<StudentRequestPage />} />
      </Routes>
    </>
  )
}

export default App
