import Navbar from "../components/Navbar";
import {
    AppstoreFilled,

} from '@ant-design/icons'
import { MdPerson } from "react-icons/md";
import { BsBox2Fill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const requestManagement = () => {

    const menuItems = [
        { name: 'Gestión Solicitudes', icon: <AppstoreFilled className="ml-1"/>},
        { name: 'Consejo Facultad', icon: <MdPerson className="ml-1"/>},
        { name: 'Tramite', icon: <BsBox2Fill className="ml-1"/>},
        { name: 'Configuración', icon: <IoSettingsOutline className="ml-1"/>}

    ];

    return (
        <div className="requestManagement_container">
            <Navbar menuItems={menuItems}/>
        </div>
    )
}

export default requestManagement;