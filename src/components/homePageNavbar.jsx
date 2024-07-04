import UserCardComponent from './UserCardComponet'; 
import logo from '../assets/Logo_de_la_Universidad_El_Bosque.png'; 
import './homePageNavbar.css'

const Navbar = () => {
    return (
      <nav className="flex flex-wrap items-center justify-between p-4 bg-nav text-white w-full">
        <div className="flex items-center mb-4 sm:mb-0 logo-container">
          <img src={logo} alt="Logo" className="w-auto sm:h-16 sm:w-auto" />
          <h1 className='font-bold ml-4 title'>Facultad de Ingeniería</h1>
        </div>
        <div className="flex flex-wrap items-center space-x-4 justify-center text-center">
          <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Solicitudes</button>
          <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Destacados</button>
          <button className="bg-transparent bg-gray-700 btn-hover px-4 py-2 rounded mb-2 sm:mb-0">Noticias</button>
          <UserCardComponent user={'Secretaria academica'} number={2} />
        </div>
      </nav>
    );
  };
  
  export default Navbar; 