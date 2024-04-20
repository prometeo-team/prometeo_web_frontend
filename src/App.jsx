
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage , ViewRequest, CreateRequestPage, RequestManagement } from './pages';


function App() {


  const CreateRequest = () => <h1>createRequest</h1>



  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mis-solicitudes" element={<ViewRequest />}/>
        <Route path="/crear-solicitud" element={<CreateRequest />} />
        <Route path="/gestionar-solicitudes" element={<RequestManagement/>} />
      </Routes>
    </>
  )
}

export default App
