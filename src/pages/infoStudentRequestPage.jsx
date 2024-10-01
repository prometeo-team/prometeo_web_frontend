import { useState, useEffect } from 'react';
import InfoSRComponent from '../components/ComponentInfoStudentRequest';
import Title from '../components/ComponentTittle2';
import './infoStudentRequestPage.css';
import { Button, Modal, List, notification } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { AiOutlineUpload } from "react-icons/ai";
import { Link } from 'react-router-dom';
import UserCArdComponent from '../components/UserCardComponet';
import ModalMultiUpload from '../components/ModalMultiUpload';

const InfoStudentRequestPage = () => {
    const [role, setRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [forPay, setForPay] = useState(false);
    const [documents, setDocuments] = useState([]); 
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const decodedToken = JSON.parse(jsonPayload);
            if (decodedToken.authorities.includes('ROLE_STUDENT')) {
                setRole('ROLE_STUDENT');
              } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
                setRole('ROLE_ADMIN');
              }else if (decodedToken.authorities.includes('ROLE_TEACHER')) {
                setRole('ROLE_TEACHER');
              }else if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
                setRole('ROLE_ACADEMIC');
              }else if (decodedToken.authorities.includes('ROLE_SUBACADEMIC')) {
                setRole('ROLE_SUBACADEMIC');
              }else if (decodedToken.authorities.includes('ROLE_COORDINADORPRE')) {
                setRole('ROLE_COORDINADORPRE');
              }else if (decodedToken.authorities.includes('ROLE_COORDINADORPOS')) {
                setRole('ROLE_COORDINADORPOS');
              }else if (decodedToken.authorities.includes('ROLE_DECANO')) {
                setRole('ROLE_DECANO');
              }
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const setbutton = (e) =>{
        if(e['Pendiente pago']==true && (tipo =='Adición de Créditos' || tipo =='Supletorios' || tipo =='Postulación a grados' )){
            setForPay(true);
        }
        console.log(e)
    };

    const handleCloseModal = () =>{
        setModalVisible(false);
    };

    const fetchSave = async (document) => {
        const url = window.location.href;
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        const id2 = params.get('id');
        const tipo = params.get('tipo');
        console.log(document);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
        const formdata = new FormData();
        
        formdata.append("id_request", id2);

        formdata.append("files", document[0].originalfile);
        
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        
        try {
        const response = await  fetch(`${import.meta.env.VITE_API_URL}/documents/addDocumentsToRequest`, requestOptions)
        const result = await response.json();
            if (result.status === "200 OK") {
                if(tipo == 'Supletorios'){
                    fetchput2();
                }
                if(tipo == 'Adición de Créditos'){
                    fetchput();
                }
                if(tipo == 'Postulación a grados'){
                    fetchput3();
                }
                console.log('guardado');
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const fetchput = async () =>{
        const url = window.location.href;
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        const id2 = params.get('id');
        const response2 = await fetch(`${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id2}&status=Pendiente Inscripción&username=${sessionStorage.getItem('user')}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
  
          if (response2.ok) {
            notification.success({
              message: 'Estado actualizado',
              description: `El estado se ha cambiado a Pendiente Inscripción.`,
            });
            location.reload();
          } else {
            notification.error({
              message: 'Error al actualizar el estado',
              description: 'No se pudo actualizar el estado. Intente de nuevo.',
            });
          }
    }

    const fetchput2 = async () =>{
        const url = window.location.href;
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        const id2 = params.get('id');
        const response2 = await fetch(`${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id2}&status=Pendiente firma&username=${sessionStorage.getItem('user')}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
  
          if (response2.ok) {
            notification.success({
              message: 'Estado actualizado',
              description: `El estado se ha cambiado a pendiente firma.`,
            });
            location.reload();
          } else {
            notification.error({
              message: 'Error al actualizar el estado',
              description: 'No se pudo actualizar el estado. Intente de nuevo.',
            });
          }
    }

    const fetchput3 = async () =>{
        const url = window.location.href;
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        const id2 = params.get('id');
        const response2 = await fetch(`${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id2}&status=Finalizado&username=${sessionStorage.getItem('user')}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
  
          if (response2.ok) {
            notification.success({
              message: 'Estado actualizado',
              description: `El estado se ha cambiado a Finalizado.`,
            });
            location.reload();
          } else {
            notification.error({
              message: 'Error al actualizar el estado',
              description: 'No se pudo actualizar el estado. Intente de nuevo.',
            });
          }
    }
    return (
        <div className='mx-14 h-screen scroll-container mr-4 ml-4 max-md:mx-0'>
            <div className='w-full mt-0 float-right h-20'>
                <UserCArdComponent number={2}></UserCArdComponent>
            </div>
            <div className='h-screen scroll-container mr-4 ml-4'>
                <div className='flex justify-between items-center max-md:flex-col'>
                    <Title title="Solicitud" codigo={id} tipo={tipo} />
                    <Button
                        type="primary"
                        className='shadow-lg color-button text-sm md:text-base lg:text-lg h-auto'
                        icon={<FileTextFilled />}
                        onClick={showModal}
                    >
                        Documentos adjuntos
                    </Button>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg xl:rounded-2xl border mt-3">
                    <InfoSRComponent setbutton={setbutton} />
                </div>
                {role == "ROLE_STUDENT" &&(
                <div>
                    <Link to="/student/mis-solicitudes">
                        <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12 mt-4' icon={<ArrowLeftOutlined />}>Volver</Button>
                    </Link>
                    {forPay &&(
                    <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12 mt-4 ml-5' onClick={() => setModalVisible(true)} icon={<AiOutlineUpload />}>Comprobante de pago</Button>
                    )}
                </div>
                )}
                
                <div>
                    
                </div>
                
                {role == "ROLE_TEACHER" &&(
                <div>
                    <Link to="/teacher/mis-solicitudes">
                        <Button type="primary" className='shadow-lg color-button text-sm md:text-base lg:text-lg h-12 mt-4' icon={<ArrowLeftOutlined />}>Volver</Button>
                    </Link>
                </div>
                )}
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
                        dataSource={documents.filter(doc => 
                            !doc.url.includes('__Ingles') &&
                            !doc.url.includes('__Biblioteca') &&
                            !doc.url.includes('__Finanzas') &&
                            !doc.url.includes('__OnlyAdmin')
                        )}
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
            <div>
            <ModalMultiUpload
                visible={modalVisible}
                onClose={handleCloseModal}
                setDocuments={fetchSave}
                title = {'Comprobante de pago'}
                detail ={''}
            />
            </div>
        </div>
        
        
    );
}

export default InfoStudentRequestPage;
