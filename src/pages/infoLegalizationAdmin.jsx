import InfoSRComponent from '../components/ComponentLegalizationAdmin';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button, Modal, List } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserCArdComponent from '../components/UserCardComponet';

const InfoLegalizationAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get('id');

    useEffect(() => {
        const obtenerDocumentos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/getByIdRequest?id_request=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const result = await response.json();
                setDocuments(result.data || []); // Asegurarse de que 'documents' siempre sea un array
                 
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
        <div className='flex flex-col ml-5 h-screen scroll-container mr-4  max-md:mx-0 w-full'>
            <div className='w-full h-20 mb-4'>
                <UserCArdComponent number={2} />
            </div>
            <div className='flex-grow'>
                <div className='flex justify-between items-center max-md:flex-col'>
                    <Title title="Solicitud" codigo={id} tipo={"Legalización de matrícula"} />
                    <Button
                        type="primary"
                        className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto'
                        icon={<FileTextFilled />}
                        onClick={showModal}
                    >Documentos adjuntos</Button>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-3">
                    <InfoSRComponent />
                </div>
                <div>
                    <Link to="/admin/dashboard?flag=true">
                        <Button type="primary" className='mb-2 shadow-lg color-button text-sm md:text-base lg:text-lg h-12 mt-4' icon={<ArrowLeftOutlined />}>Volver</Button>
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
        </div>

    )
}

export default InfoLegalizationAdmin;
