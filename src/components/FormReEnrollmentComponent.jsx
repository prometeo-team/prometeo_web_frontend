import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ModalReEnrollmentComponent from '../components/ModalReEnrollmentComponent';
import InputComponent from '../components/InputComponent';
import './FormLegalizationComponent.css';
import { LuUpload } from "react-icons/lu";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import ModalComponent from './ModalComponent';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Tooltip, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IoAlertCircleSharp } from "react-icons/io5";

const FormLegalizationComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [documents, setDocuments] = useState([]);

    const [studentData, setStudentData] = useState({
        name: '',
        lastName: '',
        phone: '',
        address: '',
        documentType: '',
        documentNumber: '',
        semester: '',
        description: '',
        email: ''
    });

    const getInfoToken = () => {
        const token = sessionStorage.getItem('token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleOpenModal = () => {
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

    const handleOpenModalCheck2 = () => {
        setModalVisibleCheck(true);
    };

    const handleCloseModalCheck2 = () => {
        setModalVisibleCheck(false);
    };

    const fetchPrograms = async () => {
        const userInfo = getInfoToken();
        const username = userInfo.username;
        const careerId = document.getElementById('carrer_select').value; 
        
        try {
            const response = await fetch(`http://127.0.0.1:3030/api/user/getInformationStudentOverview?username=${username}&career=${careerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.status === "200 OK") {
                const studentInfo = result.data[0];
                setStudentData({
                    name: studentInfo.name,
                    lastName: studentInfo.last_name,
                    phone: studentInfo.phone,
                    address: studentInfo.address,
                    documentType: studentInfo.document_type,
                    documentNumber: studentInfo.document_number,
                    semester: studentInfo.semester,
                    description: studentInfo.description,
                    email: studentInfo.email
                });
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch('URL_DEL_ARCHIVO', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            const a = document.createElement('a');
            a.href = url;
            a.download = 'Carte Reintegro';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <div className='legalization-container bg-white p-4 rounded-lg shadow-md m-5 warp margenL'>
            <Link to='/student/crear-solicitud'>
                <button className='w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color'>
                    <IoIosArrowBack className=" h-7 w-7" />
                    <span className="ml-2">Volver</span>
                </button>
            </Link>
            <h2 className="text-xl font-bold text-black truncate mt-5 mb-5">Información del estudiante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="max-w-xs">
                    <h3 className='text-black truncate'>Nombre(s)</h3>
                    <InputComponent type="readOnly" variant="form-input" value={studentData.name} />
                    <h3 className='text-black truncate'>Semestre</h3>
                    <InputComponent type="readOnly" variant="form-input" value={studentData.semester} />
                    <h3 className='text-black truncate'>Promedio acumulado</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                </div>

                <div className="max-w-[400px]">
                    <h3 className="text-black truncate ">Apellidos</h3>
                    <InputComponent type="readOnly" variant="form-input" value={studentData.lastName} />
                    <h3 className="text-black truncate ">Fecha de ingreso</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                    <h3 className="text-black truncate ">Cant. perdida de calidad académica</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                </div>

                <div>
                    <h3 className='text-black truncate'>Jornada</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                    <h3 className='text-black truncate'>Promedio último Semestre</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                    <h3 className='text-black truncate'>Programa académico</h3>
                    <InputComponent type="readOnly" variant="form-input" />
                </div>

                <div className="grid justify-center items-center">
                    <div>
                        <Button onClick={handleDownload} className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center mb-4">
                            Formato carta <LuDownload className="ml-2 h-7 w-7" />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={handleOpenModal} className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                            Subir carta <LuUpload className="ml-2 h-7 w-7" />
                        </Button>
                    </div>
                </div>

                <div className="col-span-4">
                    <ModalReEnrollmentComponent
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        setDocuments={setDocuments}
                    />
                </div>
            </div>
            <div>
                <div className="w-full border-t border-black truncate "></div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-black truncate mt-5 mb-5">Documento
                    <Tooltip title="Para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón 'Subir archivos'">
                        <QuestionCircleOutlined className="font-color ml-2" />
                    </Tooltip>
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    {documents.slice(0, 6).map((document, index) => (
                        <React.Fragment key={index}>
                            <div className="col-span-3 mb-4">
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
                            <div className=' grid items-center justify-center mb-5'>
                                <button
                                    className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center"
                                    onClick={handleOpenModalCheck2}
                                >
                                    <span>Confirmar</span>
                                    <FaCheck className="ml-2 h-7 w-7" />
                                </button>
                                <ModalComponent
                                    visible={modalVisibleCheck}
                                    onClose={handleCloseModalCheck2}
                                    content="Reintegro realizado correctamente"
                                    icon={<IoMdCheckmarkCircle />}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FormLegalizationComponent;