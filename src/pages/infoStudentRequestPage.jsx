import InfoSRComponent from '../components/ComponentInfoStudentRequest';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserCArdComponent from '../components/UserCardComponet';

const InfoStudentRequestPage = () => {



    return (
        <div className='mx-14'>
            <div className='w-full mt-0 float-right h-20'>
                <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
            </div>
            <div className='h-screen scroll-container mr-4 ml-4' >

                <div className='flex justify-between items-center'>
                    <Title title="Solicitud" codigo={'CE000215'} />
                    <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto' icon={<FileTextFilled />}>Documentos adjuntos</Button>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-3 ">
                    <InfoSRComponent />
                </div>
                <div>
                    <Link to="/mis-solicitudes">
                        <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12 mt-4' icon={<ArrowLeftOutlined />}>Volver</Button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default InfoStudentRequestPage;
