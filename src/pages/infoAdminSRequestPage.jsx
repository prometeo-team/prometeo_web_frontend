import InfoSRComponent from '../components/AdminInfoRrequest';
import ChatSR from '../components/ComponentChat';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserCardComponent from '../components/UserCardComponet';


const InfoStudentRequestPage = () => {



    return (
        <div>

            <div className='h-screen scroll-container mr-4 ml-4' >
                <UserCardComponent number={2} />
                <div className=' mt-4 flex justify-between items-center'>
                    <Title title="Solicitud" codigo={'CE000215'} />
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
        </div >
    )
}

export default InfoStudentRequestPage;
