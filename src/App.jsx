
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage } from './pages';


function App() {

 
  const CreateRequest = () => <h1>createRequest</h1>



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-solicitud" element={<CreateRequest />} />
      </Routes>
    </div>
  )
}

export default App
