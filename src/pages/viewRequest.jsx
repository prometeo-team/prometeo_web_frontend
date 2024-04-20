import Navbar from "../components/Navbar"
import './viewRequest.css'
import 
{ 
    AppstoreFilled, 
    InboxOutlined,
    QuestionCircleOutlined 
} from '@ant-design/icons';
import { IoCalendar } from 'react-icons/io5'
import { HiOutlineDocumentPlus, HiHome } from "react-icons/hi2";

const viewRequest = () => {

    const menuItems = [
        { name: 'Inicio', icon: <HiHome className='ml-1' /> },
        { name: 'Mis Solicitudes', icon: <AppstoreFilled className='ml-1' /> },
        { name: 'Crear Solicitud', icon: <HiOutlineDocumentPlus className='ml-1' /> },
        { name: 'Calendario Académico', icon: <IoCalendar className='ml-1' /> },
        { name: 'Otras Solicitudes', icon: <InboxOutlined className='ml-1' /> },
        { name: 'Ayuda', icon: <QuestionCircleOutlined className='ml-1' />}
    ];


    return (   
        <div className="viewRequest_container">
            <Navbar menuItems={menuItems} className={`${menuItems.length - 1 ? 'mt-36' : ''}`}/>
        </div> 
        
    )
}

export default viewRequest;