import React from 'react';
import { useEffect, useState } from 'react';
import ModalDegreeComponent from './ModalDegreeComponent';
import InputComponent from './InputComponent';
import './FormDegreeComponent.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import {Button, notification}  from "antd";
import { LuUpload } from "react-icons/lu";
import ModalComponent from './ModalComponent';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoAlertCircleSharp } from "react-icons/io5";
const user = sessionStorage.getItem('user');
var info;
const FormLegalizationComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetchInfo();
      }, []);

      const fetchInfo = async () => {
        const url = window.location.href;
    
        // Crear un objeto URL
        const urlObj = new URL(url);
    
        // Crear un objeto URLSearchParams para obtener los parámetros
        const params = new URLSearchParams(urlObj.search);
        const carrer = params.get('carrera');
        if (carrer) {
        try {
            const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/getInformationStudentOverview?username=${user}&career=${carrer}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.status === "200 OK") {
                const programOptions = JSON.stringify(result.data);
                info = JSON.parse(programOptions);
                document.getElementById('document_type').setAttribute('placeholder',info[0].document_type);
                document.getElementById('Last_name').setAttribute('placeholder',info[0].last_name);
                document.getElementById('carrer_input').setAttribute('placeholder',carrer);
                document.getElementById('num_documet').setAttribute('placeholder',info[0].document_number);
                document.getElementById('phone_input').setAttribute('placeholder',info[0].phone);
                document.getElementById('semester_input').setAttribute('placeholder',info[0].semester);
                document.getElementById('name_input').setAttribute('placeholder',info[0].name);
                document.getElementById('email_input').setAttribute('placeholder',info[0].email);
                document.getElementById('address_input').setAttribute('placeholder',info[0].address);
                console.log('Programas obtenidos:', info[0]);
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
      }else {
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
            description: 'Recuerda que para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón "Subir archivos".',
            placement: 'bottomRight',
            icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
        });
    };

    const handleOpenModalCheck = () => {
        setModalVisibleCheck(true);
    };

    const handleCloseModalCheck = () => {
        setModalVisibleCheck(false);
    };



    return (
        <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
            <Link to="/student/crear-solicitud">
                <button className="w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color">
                <IoIosArrowBack className=" h-7 w-7" />
                <span className="ml-2">Volver</span>
                </button>
            </Link>
            {/* Información del estudiante */}
            <h2 className="text-xl font-bold text-black ml-2 mt-5 mb-5">
                Información del estudiante
            </h2>
            <div className="studentInfo_container ml-2 grid grid-cols-3 gap-4">
                <div className="First Row">
                <h3 className="text-black">Tipo de documento</h3>
                <InputComponent id="document_type" type="readOnly" placeholder="Cédula de Ciudadanía" />
                <h3 className="text-black">Apellidos</h3>
                <InputComponent id="Last_name" type="readOnly" placeholder="Perez" />
                <h3 className="text-black">Carrera</h3>
                <InputComponent id="carrer_input" type="readOnly"  placeholder="Carrera"/>
                </div>
                <div className="Second Row">
                <h3 className="text-black">No. de documento</h3>
                <InputComponent id="num_documet" type="readOnly" placeholder="Cédula de Ciudadanía" />
                <h3 className="text-black">Teléfono</h3>
                <InputComponent id="phone_input" type="readOnly" placeholder="Perez" />
                <h3 className="text-black">Semestre</h3>
                <InputComponent id="semester_input" type="readOnly" placeholder="Octavo" />
                </div>
                <div className="Third Row">
                <h3 className="text-black">Pepito</h3>
                <InputComponent id="name_input" type="readOnly" placeholder="Pepito" />
                <h3 className="text-black">Correo Electrónico</h3>
                <InputComponent id="email_input" type="readOnly" placeholder="Perez" />
                <h3 className="text-black">Carrera</h3>
                <InputComponent id="address_input" type="readOnly" placeholder="Calle 134 #35-45" />
                </div>
            </div>
            <div>
                <div className="w-full border-t border-black "></div>
            </div>
            {/* Actividades */}
            <div className="activity_box ml-2 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black mt-5 mb-5">
                        Documentos
                    </h2>
                    <Button onClick={handleOpenModal} className="w-1/3 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                        Adjuntar Documentos<LuUpload className="ml-2 h-7 w-7" />
                    </Button>
                </div>
                <div className="col-span-4">
                    <ModalDegreeComponent
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        setDocuments={setDocuments}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {documents.slice(0, 10).map((document, index) => (
                        <React.Fragment key={index}>
                            {index % 2 === 0 && (
                                <div className="mb-4">
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
                                    {index + 1 < documents.length && (
                                        <div className="border bg-gray-200 rounded-md p-2 overflow-hidden">
                                            <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                {documents[index + 1].name.length > 20 ? `${documents[index + 1].name.slice(0, 20)}...pdf` : documents[index + 1].name}
                                            </div>
                                            <div>
                                                <a href={documents[index + 1].url} target="_blank" rel="noopener noreferrer" className='font-color font-bold'>
                                                    Ver documento
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {index === 4 && (
                                <div className='flex items-center justify-center'>
                                    <button
                                        className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center"
                                        onClick={handleOpenModalCheck}
                                    >
                                        <span>Confirmar</span>
                                        <FaCheck className="ml-2 h-7 w-7" />
                                    </button>
                                    <ModalComponent
                                        visible={modalVisibleCheck}
                                        onClose={handleCloseModalCheck}
                                        content="Postulacion realizada correctamente"
                                        icon={<IoMdCheckmarkCircle />}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FormLegalizationComponent;
