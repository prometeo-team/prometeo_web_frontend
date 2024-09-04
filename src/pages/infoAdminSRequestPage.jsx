import { useState, useEffect } from 'react';
import InfoSRComponent from '../components/AdminInfoRrequest';
import ChatSR from '../components/ComponentChat';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button, Modal, List } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserCardComponent from '../components/UserCardComponet';


const InfoStudentRequestPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState([]); // Inicializar con un array vacío
    const [loading, setLoading] = useState(false);

    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get('id');

    useEffect(() => {
        const obtenerDocumentos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/documents/getByIdRequest?id_request=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const result = await response.json();
                setDocuments(result.data || []); // Asegurarse de que 'documents' siempre sea un array
                console.log('Documentos obtenidos:', result.data);
            } catch (error) {
                console.error("Error al obtener los documentos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isModalOpen) {
            obtenerDocumentos();
        }
    }, [id, isModalOpen]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div>

            <div className='h-screen scroll-container mr-4 ml-4 ' >
                <UserCardComponent number={2} />
                <div className=' mt-4 flex justify-between items-center'>
                    <Title title="Solicitud" codigo={'CE000215'} />
                    <Button
                        type="primary" 
                        className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto' 
                        icon={<FileTextFilled />}
                        onClick={showModal}
                        >Documentos adjuntos</Button>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border ">
                    <InfoSRComponent />
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-4 mb-4">
                    <ChatSR />
                </div>
                <div className='mb-4'>
                    <Link to="/mis-solicitudes">
                        <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12 ' icon={<ArrowLeftOutlined />}>Volver</Button>
                    </Link>
                </div>
            </div>
            <Modal
                title="Documentos Adjuntos"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                className='-mt-16'
            >
                {loading ? (
                    <p>Cargando documentos...</p>
                ) : documents.length === 0 ? (
                    <p>No hay archivos.</p>
                ) : (
                    <List
                        itemLayout="vertical"
                        dataSource={documents}
                        renderItem={item => {
                            let fileName = item.url.split('/').pop();
                            fileName = fileName.replace(/_ID_\d+_/, '');

                            return (
                                <List.Item key={item.id}>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        {fileName} - {new Date(item.uploaded_at).toLocaleString()}
                                    </a>
                                </List.Item>
                            );
                        }}
                    />
                )}
            </Modal>
        </div >
    )
}

export default InfoStudentRequestPage;
