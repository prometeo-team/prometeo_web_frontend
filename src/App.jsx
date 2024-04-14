
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, StudentRequestPage, InfoRequestPage } from './pages';


function App() {


  const CreateRequest = () => <h1>createRequest</h1>



  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-solicitud" element={<CreateRequest />} />
        <Route path="/mis-solicitudes" element={<StudentRequestPage />} />
        <Route path="/mi-solicitud" element={<InfoRequestPage />} />
      </Routes>
    </>
  )
}

export default App
