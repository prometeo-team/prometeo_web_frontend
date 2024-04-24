import UserCArdComponent from '../components/UserCardComponet';
import Navbar from '../components/Navbar';
import 
{ 
    AppstoreFilled, 
    InboxOutlined,
    QuestionCircleOutlined 
} from '@ant-design/icons';
import { IoCalendar } from 'react-icons/io5'
import { HiOutlineDocumentPlus, HiHome } from "react-icons/hi2";
import './infoAdminRequestPage.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const InfoAdminRequestPage = () => {
    const menuItems = [
        { name: 'Inicio', icon: <HiHome className='ml-1' /> },
        { name: 'Mis Solicitudes', icon: <AppstoreFilled className='ml-1' /> },
        { name: 'Crear Solicitud', icon: <HiOutlineDocumentPlus className='ml-1' /> },
        { name: 'Calendario Académico', icon: <IoCalendar className='ml-1' /> },
        { name: 'Otras Solicitudes', icon: <InboxOutlined className='ml-1' /> },
        { name: 'Ayuda', icon: <QuestionCircleOutlined className='ml-1'/>}
    ];
    return (
        <div className='grid-cols-2 grid'>
            <Navbar menuItems={menuItems}></Navbar>
            <div className="m-4 ml-10">
                <UserCArdComponent user= "Secretaria Academica"></UserCArdComponent>
            </div>
        </div>
    )
}

export default InfoAdminRequestPage;
