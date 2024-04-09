
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage } from './pages';


function App() {


  const CreateRequest = () => <h1>createRequest</h1>



  return (
    <div className="App">
      <div className="bg-gray-100 p-4">
        <h1 className="text-3xl font-bold">Título</h1>
        <p className="text-gray-500 mb-4">Este es un párrafo con estilo.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Enviar</button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-solicitud" element={<CreateRequest />} />
      </Routes>
    </div>
  )
}

export default App
