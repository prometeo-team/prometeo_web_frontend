import React, { useState, useEffect, useRef } from 'react';
import { Button, notification, Tooltip, Modal } from 'antd';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoAlertCircleSharp } from "react-icons/io5";
import InputComponent from '../components/InputComponent';
import ModalComponent from './ModalComponent';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const FormActivationComponent = () => {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [studentInfo, setStudentInfo] = useState({});
    const [requestId, setRequestId] = useState(null);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalIcon, setModalIcon] = useState(null);
    const [html, setHtml] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef(null);
    const [htmlContent, setHtmlContent] = useState('<h1>Este es tu documento</h1><p>El contenido con estilos aparecerá aquí.</p>');
    const [downloadedFile, setDownloadedFile] = useState(null);

    const user = sessionStorage.getItem('user');
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const career = params.get('carrera');

    useEffect(() => {
        fetchStudentInfo();
    }, []);

    const fetchStudentInfo = async () => {
        if (career) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getInformationStudentOverview?username=${user}&career=${career}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const result = await response.json();
                if (result.status === "200 OK") {
                    setStudentInfo(result.data[0]);
                } else {
                    console.error("Error en la respuesta:", result.message);
                }
            } catch (error) {
                console.error("Error al obtener la información del estudiante:", error);
            }
        } else {
            console.error("El parámetro 'carrera' no está presente en la URL");
        }
    };

    const handleOpenModal = async () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        notification.info({
            message: 'Importante',
            description: 'Recuerda que para poder modificar o eliminar el archivo, haz clic en el botón "Subir carta".',
            placement: 'bottomRight',
            icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
        });
    };

    const handleOpenModalCheck2 = (content, icon) => {
        setModalVisibleCheck(true);
        setModalContent(content);
        setModalIcon(icon);
    };

    const handleCloseModalCheck2 = () => {
        navigate('/student/crear-solicitud');
        setModalVisibleCheck(false);
    };

    const handleCreateRequest = async (pdfFile) => {
        if (!career || !user) {
            console.error("Faltan parámetros necesarios");
            return;
        }

        const requestData = {
            userEntity: user,
            requestTypeEntity: 'Reserva de Cupo',
            programStudent: career,
        };

        const requestJson = new Blob([JSON.stringify(requestData)], { type: 'application/json' });

        const formData = new FormData();
        formData.append("request", requestJson);

        // Append the generated PDF file
        if (pdfFile) {
            formData.append("files", pdfFile);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/request/uploadAndCreateRequest`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la solicitud');
            }

            const data = await response.json();
            setRequestId(data.requestId);
            handleOpenModalCheck2('Solicitud creada correctamente', <IoMdCheckmarkCircle />);
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
            handleOpenModalCheck2('No se pudo crear la solicitud.', <IoMdCloseCircle />);
        }
    };



    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/template/getTemplateDocumentWord?username=${user}&requestType=Reserva de Cupo&career=${career}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const result = await response.json();

                if (result.status === "200" && result.data) {
                    setHtmlContent(result.data);
                    console.log(result.data)
                } else {
                    console.error('No se encontró el documento.');
                }
            } catch (error) {
                console.error('Error al obtener el documento:', error);
            }
        };

        fetchDocument();
    }, [user]);

    const handleopenmodal = () => {
        setIsModalVisible(true);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        const newHtmlContent = contentRef.current.innerHTML;
        setHtmlContent(newHtmlContent);
        setIsEditing(false);
    };


    const sanitizeHTML = (htmlContent) => {
        // Reemplazar etiquetas mal formadas
        return htmlContent
            .replace(/<br>/g, '<br />')                // Corregir <br>
            .replace(/<link([^>]+)>/g, '<link$1 />')   // Corregir <link>
            .replace(/<meta([^>]+)>/g, '<meta$1 />');  // Corregir <meta>
    };

    const handleSend = async () => {
        if (!user || !career || !htmlContent) {
            console.error("Faltan datos necesarios para generar el PDF.");
            return;
        }

        const sanitizedContent = sanitizeHTML(htmlContent);

        // Create a temporary element to generate the PDF
        const element = document.createElement('div');
        element.innerHTML = sanitizedContent;

        const pdfOptions = {
            margin: 1,
            filename: `${studentInfo.name}_${studentInfo.last_name}_Carta.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate PDF and prepare it for uploading
        html2pdf().from(element).set(pdfOptions).toPdf().get('pdf').then(async (pdf) => {
            const pdfBlob = await pdf.output('blob');
            const pdfFile = new File([pdfBlob], pdfOptions.filename, { type: 'application/pdf' });

            // Set the downloaded file state
            setDownloadedFile(pdfFile);

            // Now you can call handleCreateRequest with the created PDF
            handleCreateRequest(pdfFile);
        });
    };




    return (
        <div className='reserva-container bg-white p-4 rounded-lg shadow-md m-5 warp margenL'>
            <Link to='/student/crear-solicitud'>
                <button className='w-40 h-5 font-bold text-lg flex items-center mb-5 font-color'>
                    <IoIosArrowBack className="h-7 w-7" />
                    <span className="ml-2">Volver</span>
                </button>
            </Link>
            <h2 className="text-xl font-bold text-black truncate mt-5 mb-5">Información del estudiante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="w-full max-w-xs">
                    <h3 className='text-black truncate'>Nombre(s)</h3>
                    <InputComponent id="name_input" type="readOnly" variant="form-input" placeholder={studentInfo.name || "Nombre"} value={studentInfo.name || ""} className="w-full" />
                    <h3 className='text-black truncate mt-2'>Tipo de documento</h3>
                    <InputComponent id="documente_type" type="readOnly" variant="form-input" placeholder={studentInfo.document_type || "Tipo de documento"} value={studentInfo.document_type || ""} className="w-full" />
                    <h3 className='text-black truncate mt-2'>Carrera</h3>
                    <InputComponent id="cumulative_average_input" type="readOnly" variant="form-input" placeholder={career || "Carrera"} value={career || ""} className="w-full" />
                </div>

                <div className="w-full max-w-xs">
                    <h3 className="text-black truncate">Apellidos</h3>
                    <InputComponent id="last_name_input" type="readOnly" variant="form-input" placeholder={studentInfo.last_name || "Apellidos"} value={studentInfo.last_name || ""} className="w-full" />
                    <h3 className="text-black truncate mt-2">No. de documento</h3>
                    <InputComponent id="admission_date_input" type="readOnly" variant="form-input" placeholder={studentInfo.document_number || "No. de documento"} value={studentInfo.document_number || ""} className="w-full" />
                    <h3 className="text-black truncate mt-2">Dirección</h3>
                    <InputComponent id="academic_loss_input" type="readOnly" variant="form-input" placeholder={studentInfo.address || "Cantidad"} value={studentInfo.address || ""} className="w-full" />
                </div>

                <div className="w-full max-w-xs">
                    <h3 className='text-black truncate'>Teléfono</h3>
                    <InputComponent id="schedule_input" type="readOnly" variant="form-input" placeholder={studentInfo.phone || "Jornada"} value={studentInfo.phone || ""} className="w-full" />
                    <h3 className='text-black truncate mt-2'>Semestre</h3>
                    <InputComponent id="semester_input" type="readOnly" variant="form-input" placeholder={studentInfo.semester || "Semestre"} value={studentInfo.semester || ""} className="w-full" />
                    <h3 className='text-black truncate mt-2'>Correo electrónico</h3>
                    <InputComponent id="career_input" type="readOnly" variant="form-input" placeholder={studentInfo.email + "@unbosque.edu.co" || "Programa académico"} value={studentInfo.email + "@unbosque.edu.co" || ""} className="w-full" />
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                    <Button
                        onClick={handleopenmodal}
                        className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center mb-4 px-4 whitespace-normal overflow-hidden text-ellipsis hover:bg-blue-600">
                        Modificar carta
                    </Button>

                </div>

                <Modal
                    title="Vista previa del documento"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="firmar" type="primary" onClick={""}>
                            Firmar
                        </Button>,
                    ]}
                >
                    <p>Por favor, revise el documento antes de firmarlo.</p>
                    {html ? (
                        <div style={{ height: '600px', overflow: 'auto' }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: html }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    ) : (
                        <p>No se encontró el documento.</p>
                    )}
                </Modal>
                <Modal
                    title="Vista previa del documento"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    width={700}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="edit" onClick={toggleEdit}>
                            {isEditing ? 'Dejar de editar' : 'Editar'}
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSave} disabled={!isEditing}>
                            Guardar
                        </Button>,
                        <Button key="firmar" type="primary" onClick={handleSend} disabled={isEditing} >
                            Enviar
                        </Button>,
                    ]}
                >
                    <div
                        contentEditable={isEditing}
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        style={{
                            border: isEditing ? '1px solid gray' : 'none',
                            padding: '10px',
                            height: '600px',
                            overflowY: 'auto',
                        }}
                    />
                </Modal>


            </div>
            <div>
                <div className="w-full border-t border-black truncate"></div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-black truncate mt-5 mb-5">Documento
                    <Tooltip title="Para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón 'Subir archivos'">
                        <QuestionCircleOutlined className="font-color ml-2" />
                    </Tooltip>
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    {downloadedFile ? (
                        // Mostrar el archivo descargado si existe
                        <React.Fragment>
                            <div className="col-span-4 md:col-span-3 mb-4">
                                <div className="border bg-gray-200 rounded-md p-2 mb-2 overflow-hidden">
                                    <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {downloadedFile.name.length > 20 ? `${downloadedFile.name.slice(0, 20)}...pdf` : downloadedFile.name}
                                    </div>
                                    <div>
                                        <a href={downloadedFile.url} target="_blank" rel="noopener noreferrer" className='font-color font-bold'>
                                            Ver documento
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-1 flex items-center justify-center mb-5">
                                <button
                                    className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center p-4"
                                    onClick={handleCreateRequest}
                                >
                                    <span>Confirmar</span>
                                    <FaCheck className="ml-2 h-7 w-7" />
                                </button>
                                <ModalComponent
                                    visible={modalVisibleCheck}
                                    onClose={handleCloseModalCheck2}
                                    content={modalContent}
                                    icon={modalIcon}
                                />
                            </div>
                        </React.Fragment>
                    ) : (

                        documents.slice(0, 6).map((document, index) => (
                            <React.Fragment key={index}>
                                <div className="col-span-4 md:col-span-3 mb-4">
                                    <div className="border bg-gray-200 rounded-md p-2 mb-2 overflow-hidden">
                                        <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {document.name.length > 20 ? `${document.name.slice(0, 20)}...pdf` : document.name}
                                        </div>
                                        <div>
                                            <a href={document.url} target="_blank" rel="noopener noreferrer" className='font-color font-bold'>
                                                Ver documento
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-1 flex items-center justify-center mb-5">
                                    <div className="col-span-4 md:col-span-1 flex items-center justify-center mb-5">
                                        <button
                                            className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center p-4"
                                            onClick={() => handleCreateRequest(downloadedFile)} // Updated line
                                        >
                                            <span>Confirmar</span>
                                            <FaCheck className="ml-2 h-7 w-7" />
                                        </button>
                                        <ModalComponent
                                            visible={modalVisibleCheck}
                                            onClose={handleCloseModalCheck2}
                                            content={modalContent}
                                            icon={modalIcon}
                                        />
                                    </div>

                                    <ModalComponent
                                        visible={modalVisibleCheck}
                                        onClose={handleCloseModalCheck2}
                                        content={modalContent}
                                        icon={modalIcon}
                                    />
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormActivationComponent;