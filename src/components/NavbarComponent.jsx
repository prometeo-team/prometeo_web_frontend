import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './NavbarComponent.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import {
  AppstoreFilled,
  InboxOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { IoCalendar, IoSettingsOutline, IoSchoolOutline } from 'react-icons/io5';
import { HiOutlineDocumentPlus, HiHome } from "react-icons/hi2";
import { FaClipboardList } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

function NavbarComponent({ menuItems }) {
  const navigate = useNavigate();

    return (
        <>
            <div className={`h-screen flex-col w-60 flex bg-[#43737e] max-md:w-20`}>
                <img className='logo_menu block  justify-center content-center select-none  p-2 pb-5 ml-5 mt-2 max-w-30 md:max-w-44 max-md:w-16 max-md:ml-2 max-md:mt-6 max-md:p-0 ' src={logoUni} alt="Logo de la Universidad el Bosque" />
                <div className='bg-[#43737e] max-md:p-3 p-1'>
                    <ul className='navbar_menu flex justify-between  flex-col gap-4 ml-2 p-2 w-56 max-sm:w-16 max-md:w-16 max-md:mt-20 max-md:ml-0 max-md:absolute '>
                        {menuItems.map((item, index) => {
                            let icon = item.icon;
                            if (item.name === "Inicio") {
                                icon = <HiHome className='ml-1 text-2xl' />;
                            } else if (item.name === "Mis Solicitudes") {
                                icon = <AppstoreFilled className='ml-1 text-2xl' />;
                            } else if (item.name === "Crear Solicitud") {
                                icon = <HiOutlineDocumentPlus className='ml-1 text-2xl' />;
                            } else if (item.name === "Calendario Académico") {
                                icon = <IoCalendar className='ml-1 text-2xl' />;
                            } else if (item.name === "Otras Solicitudes") {
                                icon = <InboxOutlined className='ml-1 text-2xl' />;
                            } else if (item.name === "Ayuda") {
                                icon = <QuestionCircleOutlined className='ml-1 text-2xl' />;
                            } else if (item.name === "Gestión Solicitudes") {
                                icon = <AppstoreFilled className='ml-1 text-2xl' />;
                            } else if (item.name === "Consejo Facultad") {
                                icon = <MdPerson className='ml-1 text-2xl' />;
                            } else if (item.name === "Configuración") {
                                icon = <IoSettingsOutline className='ml-1 text-2xl' />;
                            } else if (item.name === "Grados") {
                                icon = <IoSchoolOutline className='ml-1 text-2xl' />;
                            }else if (item.name === "Trazabilidad") {
                                icon =  <FaClipboardList className='ml-1 text-2xl' />;
                            }
                            const isLastItem = index === menuItems.length - 1 && item.name === "Ayuda"; // Verifica si es el último elemento
                            const liClass = isLastItem ? ' ' : '';
                            const isManagement = index === 0 && item.name === "Gestión Solicitudes";
                            const liOption = isManagement ? 'mt-6' : '';
                            return (
                                <li onClick={() => {
                                                    navigate(item.path);
                                                    sessionStorage.removeItem('urlAnt');
                                                    }} key={index}
                                    className={`navbar_wrapper flex items-center gap-2 mb-5 text-white  max-md:text-2xl max-md:mb-5 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 rounded itemp p-1 ${liClass} ${liOption}`}>
                                    {icon}
                                    <button className='text-white w-full text-left ml-1 max-md:hidden'>{item.name}</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>

    )
    
}

export default NavbarComponent;
