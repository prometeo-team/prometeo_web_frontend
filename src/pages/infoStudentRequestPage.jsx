import InfoSRComponent from '../components/ComponentInfoStudentRequest';
import ChatSR from '../components/ComponentChat';
import Tittle from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { NavbarComponent} from "../components/"

const InfoStudentRequestPage = () => {

    const menuItems = [
        { name: 'Inicio'},
        { name: 'Mis Solicitudes'},
        { name: 'Crear Solicitud'},
        { name: 'Calendario Académico'},
        { name: 'Otras Solicitudes'},
        { name: 'Ayuda'}
    ];

    return (
        <div className=" flex">
            <div className="h-screen flex">
                <NavbarComponent menuItems={menuItems} />
            </div>

           <div className='m-4 ml-10'>
            <div className='flex justify-between items-center'>
                <Tittle />
                <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto' icon={<FileTextFilled />}>Documentos adjuntos</Button>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border ">
                <InfoSRComponent />
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-4 mb-4">
                <ChatSR />
            </div>
            <div>
                <Link to="/mis-solicitudes">
                    <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12' icon={<ArrowLeftOutlined />}>Volver</Button>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default InfoStudentRequestPage;
