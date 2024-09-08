import React,{ useEffect, useState } from 'react';
import InputComponent from './InputComponent';
import { IoIosArrowBack,IoMdCheckmarkCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import {Button, notification,Spin}  from "antd";
import { LuDownload, LuUpload } from "react-icons/lu";
import ModalComponent from './ModalComponent';
import { FaCheck } from "react-icons/fa6";
import { IoAlertCircleSharp } from "react-icons/io5";
import { LoadingOutlined } from '@ant-design/icons';
import ModalDegreeComponent from './ModalDegreeComponent';
import ModalDegree2Component from './ModalDegree2Component';
import './FormDegreeComponent.css';

const user = sessionStorage.getItem('user');
let career;
let role;

const FormDegreeComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [studentInfo, setStudentInfo] = useState({});
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInfo();
      }, []);

    const fetchInfo = async () => {
        const url = window.location.href;
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        career = params.get('carrera').split("-")[0];
        role = params.get('carrera').split("-")[1];
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
                console.error("Error al obtener los programas:", error);
            }
        }else {
            console.error("El parámetro 'carrera' no está presente en la URL");
        }
    };

    const handleOpenModal = () => {
        if(role=='pregrado'){
            setModalVisible(true);
        }else if(role=='posgrado'){
            setModalVisible2(true);
        }

    };

    const handleCloseModal = (option) => {
        console.log(documents);
        if(option){
            setIsButtonVisible(true);
        }
        setModalVisible(false);
        notification.info({
            message: 'Importante',
            description: 'Recuerda que para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón "Subir archivos".',
            placement: 'bottomRight',
            icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
        });
    };

    const handleCloseModal2 = (option) => {
        console.log(documents);
        if(option){
            setIsButtonVisible(true);
        }
        setMod
        setModalVisible2(false);
        notification.info({
            message: 'Importante',
            description: 'Recuerda que para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón "Subir archivos".',
            placement: 'bottomRight',
            icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
        });
    };

    const handleOpenModalCheck = () => {
        setIsButtonVisible(false);
        setLoading(true);
        fetchSave();
    };

    const handleCloseModalCheck = () => {
        setModalVisibleCheck(false);
        navigate("/student/mis-solicitudes");
    };

    const handleDonwload = () =>{
        window.open('https://prometeo-bucket.s3.us-east-2.amazonaws.com/Formato+solicitud+de+grado.pdf', '_blank');
    };

    const fetchSave = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
        const formdata = new FormData();
        const requestJson = new Blob([JSON.stringify({
          userEntity: user,
          requestTypeEntity: 'Postulación a Grados',
          programStudent: career
        })], { type: 'application/json' });
  
        formdata.append("request", requestJson);
  
        if (documents.length > 0) {
          console.log(documents);
          documents.forEach((file) => {
            formdata.append("files", file.originalfile);
          });
        }
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };
  
  
      try {
      const response = await  fetch("https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/uploadAndCreateRequest", requestOptions)
      const result = await response.json();
          if (result.status === "200 OK") {
            setLoading(false);
            setModalVisibleCheck(true);
          } else {
            console.error("Error en la respuesta:", result.message);
          }
      } catch (error) {
          console.error("Error al obtener los programas:", error);
      }
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
                    <Button onClick={handleDonwload} className="w-1/3 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                        Descargar Formato<LuDownload className="ml-2 h-7 w-7" />
                    </Button>
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
                    <ModalDegree2Component
                        visible={modalVisible2}
                        onClose={handleCloseModal2}
                        setDocuments={setDocuments}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {documents.slice(0, 7).map((document, index) => (
                        <React.Fragment key={index}>
                            {index % 2 === 0 && (
                                <div className="mb-4">
                                    <div className="border bg-gray-200 rounded-md p-2 mb-2 overflow-hidden">
                                        <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {document.name.length > 20 ? `${document.name.slice(0, 17)}...${document.name.split('.').pop()}` : document.name}
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
                                                {documents[index + 1].name.length > 20 ? `${documents[index + 1].name.slice(0, 20)}...${documents[index + 1].name.split('.').pop()}` : documents[index + 1].name}
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
                        </React.Fragment>
                    ))}
                    
                        <div className='flex items-center justify-center'>
                        {isButtonVisible  && (
                            <button
                                className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-center items-center"
                                onClick={handleOpenModalCheck}
                            >
                                <span>Confirmar</span>
                                <FaCheck className="ml-2 h-7 w-7" />
                            </button>
                        )}
                        {loading  && (
                         <div className="loader-container">
                            <Spin indicator={<LoadingOutlined spin />} size="large" />
                        </div>
                        )}
                            <ModalComponent
                                visible={modalVisibleCheck}
                                onClose={handleCloseModalCheck}
                                content="Postulacion realizada correctamente"
                                icon={<IoMdCheckmarkCircle />}
                            />
                        </div>
                    
                </div>
            </div>
        </div>
    );
};

export default FormDegreeComponent;
