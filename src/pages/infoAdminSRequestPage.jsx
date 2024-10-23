import { useState, useEffect } from 'react';
import InfoSRComponent from '../components/AdminInfoRrequest';
import InfoSRComponent2 from '../components/AdminInfoRrequest2';
import InfoSRComponent3 from '../components/AdminInfoRrequest3';
import InfoSRComponent4 from '../components/AdminInfoRrequest4';
import ChatSR from '../components/ComponentChat';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button, Modal, List, Input } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserCardComponent from '../components/UserCardComponet';


const { TextArea } = Input;
const InfoStudentRequestPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState([]); // Inicializar con un array vacío
    const [loading, setLoading] = useState(false);
    const [detail1, setDetail1] = useState(true);
    const [detail2, setDetail2] = useState(false);
    const [detail3, setDetail3] = useState(false);
    const [detail4, setDetail4] = useState(false);
    const [detail5, setDetail5] = useState(false);
    const [txtDeatil, setTxtDeatil] = useState('');

    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get('id');
    const tipo = params.get('tipo');

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
        if (tipo=='Incapacidades Estudiantes' || tipo=='Adición de créditos' || tipo=='Retiro de créditos' || tipo=='Supletorios') {
            setDetail2(true);
            setDetail3(false);
            setDetail4(false);
            setDetail5(false);
        }else if (tipo=='Incapacidades Docentes'){
            setDetail1(false);
            setDetail2(false);
            setDetail3(true);
            setDetail4(false);
            setDetail5(false);
        }else if (tipo=='Postulación a Grados'){
            setDetail2(false);
            setDetail3(false);
            setDetail4(true);
            setDetail5(false);
        }else if (tipo=='Otras solicitudes'){
            setDetail2(false);
            setDetail3(false);
            setDetail4(false);
            obtenerDetalle();
            setDetail5(true);
        }else{
            setDetail2(false);
            setDetail3(false);
            setDetail4(false);
        }

    }, [id, isModalOpen]);

    const obtenerDetalle = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/get?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
           if(response.ok){
            setTxtDeatil(result.data.description);
           }
        } catch (error) {
            console.error("Error al obtener el detalle:", error);
        } 
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleBack = () => {
        if(sessionStorage.getItem('urlAnt') == 'consejo'){
            navigate('/admin/consejo-facultad');
        }else if(sessionStorage.getItem('urlAnt') == 'dash'){
            navigate('/admin/dashboard?flag=yes');
        }
    };

    return (
        <div>

            <div className='h-screen scroll-container mr-4 ml-4 ' >
                <UserCardComponent number={2} />
                <div className=' mt-4 flex justify-between items-center'>
                    <Title title="Solicitud" codigo={id} tipo={tipo}/>
                    <Button
                        type="primary"
                        className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto'
                        icon={<FileTextFilled />}
                        onClick={showModal}
                    >Documentos adjuntos</Button>
                </div>
                {detail1 && (
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border ">
                    <InfoSRComponent />
                </div>
                )}
                {detail2 && (
                    <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl mt-4 border ">
                    <InfoSRComponent2 />
                    </div>
                )}
                {detail3 && (
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border ">
                    <InfoSRComponent3 />
                </div>
                )}
                {detail4 && (
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-4">
                    <InfoSRComponent4 />
                </div>
                )}
                {detail5 && (
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-4">
                     <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
                     Detalle
                    </span>
                    <TextArea
                    id="prueba"
                    style={{ height: 80, resize: "none" }}
                    value={txtDeatil}
                    disabled={true}
                  />
                </div>
                )}
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-4 mb-4">
                    <ChatSR id={id} />
                </div>
                <div className='mb-4'>
                    <Button
                        type="primary"
                        className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12'
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBack}
                    >
                        Volver
                    </Button>
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
