import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ModalSlotActivationComponent from './ModalSlotActivationComponent';
import InputComponent from './InputComponent';
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

const FormSlotActivationComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [studentInfo, setStudentInfo] = useState({});

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
                const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/getInformationStudentOverview?username=${user}&career=${career}`, {
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
                    <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center mb-4 px-4 whitespace-normal overflow-hidden text-ellipsis">
                        Formato carta <LuDownload className="ml-2 h-7 w-7 flex-shrink-0" />
                    </Button>
                    <Button onClick={handleOpenModal} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center px-4 whitespace-normal overflow-hidden text-ellipsis">
                        Subir carta <LuUpload className="ml-2 h-7 w-7 flex-shrink-0" />
                    </Button>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                    <ModalSlotActivationComponent
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        setDocuments={setDocuments}
                    />
                </div>
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
                    {documents.slice(0, 6).map((document, index) => (
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
                            {/* Columna para el botón */}
                            <div className="col-span-4 md:col-span-1 flex items-center justify-center mb-5">
                                <button
                                    className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center p-4"
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

export default FormSlotActivationComponent;
