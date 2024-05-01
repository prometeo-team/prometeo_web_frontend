import './NavbarComponent.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import { useState } from 'react';
import {
AppstoreFilled,
InboxOutlined,
QuestionCircleOutlined
} from '@ant-design/icons';
import { IoCalendar, IoSettingsOutline, IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { HiOutlineDocumentPlus, HiHome } from "react-icons/hi2";
import { MdPerson } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function NavbarComponent({ menuItems }) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [leftArrow, setArrowVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setArrowVisible(!leftArrow);
    };

    return (
        <>
            <div className={`navbar md:flex flex-col w-fit bg-[#43737e] h-screen ${!menuVisible ? 'hidden' : ''}`}>
                <img className='logo_menu block justify-center content-center select-none ml-6 pb-5 max-w-32 md:max-w-44 mt-8' src={logoUni} alt="Logo de la Universidad el Bosque" />
                <div className='bg-[#43737e]'>
                    <ul className='navbar_menu flex justify-between flex-col gap-4 ml-2 p-2 w-40 md:w-56'>
                        {menuItems.map((item, index) => {
                            let icon = item.icon;
                            if (item.name === "Inicio") {
                                icon = <HiHome className='ml-1' />;
                            } else if (item.name === "Mis Solicitudes") {
                                icon = <AppstoreFilled className='ml-1' />;
                            } else if (item.name === "Crear Solicitud") {
                                icon = <HiOutlineDocumentPlus className='ml-1' />;
                            } else if (item.name === "Calendario Académico") {
                                icon = <IoCalendar className='ml-1' />;
                            } else if (item.name === "Otras Solicitudes") {
                                icon = <InboxOutlined className='ml-1' />;
                            } else if (item.name === "Ayuda") {
                                icon = <QuestionCircleOutlined className='ml-1' />;
                            } else if (item.name === "Gestión Solicitudes") {
                                icon = <AppstoreFilled className="ml-1" />;
                            } else if (item.name === "Consejo Facultad") {
                                icon = <MdPerson className="ml-1" />;
                            } else if (item.name === "Configuración") {
                                icon = <IoSettingsOutline className="ml-1" />;
                            }
                            const isLastItem = index === menuItems.length - 1 && item.name === "Ayuda"; // Verifica si es el último elemento
                            const liClass = isLastItem ? 'md:mt-52 2xl:mt-96' : '';
                            const isManagement = index === 0 && item.name === "Gestión Solicitudes";
                            const liOption = isManagement ? 'mt-6' : '';
                            return (
                                <li key={index}
                                    className={`navbar_wrapper flex items-center gap-2 text-white sm:h-auto md:h-8
                                    transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 rounded itemp ${liClass} ${liOption}`}>
                                    {icon}
                                    <button className='text-white'>{item.name}</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {leftArrow ? (
                <IoArrowBackCircleOutline className="leftarrow md:fixed md:hidden w-fit h-10 text-[#97B749]" onClick={toggleMenu} />
            ) : (
                <IoArrowForwardCircleOutline className="leftarrow md:fixed md:hidden w-fit h-10 text-[#97B749]" onClick={toggleMenu} />
            )}
        </>

    )
}

export default NavbarComponent;