import InfoSRComponent from '../components/ComponentInfoStudentRequest';
import ChatSR from '../components/ComponentChat';
import Tittle from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const InfoStudentRequestPage = () => {
    return (
        <div className="m-4 ml-10">
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
    )
}

export default InfoStudentRequestPage;
