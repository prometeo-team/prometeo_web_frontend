import React from 'react';
import { Button } from 'antd';
import { useState } from 'react';
import ModalLegalizationComponent from '../components/ModalLegalizationComponent';
import InputComponent from '../components/InputComponent';
import './FormLegalizationComponent.css';
import { LuUpload } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import ModalComponent from './ModalComponent';
import { IoMdCheckmarkCircle } from "react-icons/io";

const FormLegalizationComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
    const [documents, setDocuments] = useState([]);

    const handleOpenModal = () => {
        setModalVisible(true);

    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModalCheck = () => {
        setModalVisibleCheck(true);
    };

    const handleCloseModalCheck = () => {
        setModalVisibleCheck(true);
    };



    return (
        <div className='legalization-container bg-white p-4 rounded-lg shadow-md m-5'>
            <Link to='/crear-solicitud'>
                <button className='w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color'>
                    <IoIosArrowBack className=" h-7 w-7" />
                    <span className="ml-2">Volver</span>
                </button>
            </Link>
            <h2 className="text-xl font-bold text-black mt-5 mb-5">Información del estudiante</h2>
            <div className=" grid grid-cols-4 gap-4">
                <div>
                    <h3 className='text-black'>Tipo de documento</h3>
                    <InputComponent
                        type="box"
                        placeholder="Tipo de documento"
                        variant="form-input"
                        options={[
                            { value: 'CC', label: 'Cédula de Ciudadanía' },
                            { value: 'CE', label: 'Cédula de Extranjería' },
                            { value: 'TI', label: 'Tarjeta de Identidad' },
                            { value: 'PS', label: 'Pasaporte' },
                            { value: 'RC', label: 'Registro Civil' },
                        ]}
                    />
                    <h3 className='text-black'>Apellidos</h3>
                    <InputComponent type="string" placeholder="Ingrese sus apellidos" variant="form-input" />
                    <h3 className='text-black'>Carrera</h3>
                    <InputComponent
                        type="box"
                        placeholder="Carrera"
                        variant="form-input"
                        options={[
                            { value: 'BI', label: 'Bioingeniería' },
                            { value: 'IA', label: 'Ingeniería Ambiental' },
                            { value: 'IS', label: 'Ingeniería de Sistemas' },
                            { value: 'IE', label: 'Ingeniería Electrónica' },
                            { value: 'II', label: 'Ingeniería Industrial' },
                        ]}
                    />
                </div>

                <div>
                    <h3 className='text-black'>No. de documento</h3>
                    <InputComponent type="number" placeholder="Ingrese su número de documento" variant="form-input" />
                    <h3 className='text-black'>Telefono</h3>
                    <InputComponent type="number" placeholder="Ingrese su número de telefono" variant="form-input" />
                    <h3 className='text-black'>Semestre</h3>
                    <InputComponent type="string" placeholder="Ingrese su Semestre" variant="form-input" />
                </div>

                <div>
                    <h3 className='text-black'>Nombre</h3>
                    <InputComponent type="string" placeholder="Ingrese su nombre" variant="form-input" />
                    <h3 className='text-black'>Correo electrónico</h3>
                    <InputComponent type="correo" placeholder="Ingrese su correo electrónico" variant="form-input" />
                    <h3 className='text-black'>Dirección</h3>
                    <InputComponent type="string" placeholder="Ingrese su dirección" variant="form-input" />
                </div>

                <div className="flex items-center justify-center">
                    <Button onClick={handleOpenModal} className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                        Subir archivos <LuUpload className="ml-2 h-7 w-7" />
                    </Button>
                </div>

                <div className="col-span-4">
                    <ModalLegalizationComponent
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        setDocuments={setDocuments}
                    />
                </div>
            </div>
            <div>
                <div className="w-full border-t border-black "></div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-black mt-5 mb-5">Documentos</h2>
                <div className="grid grid-cols-4 gap-4">
                    {documents.slice(0, 6).map((document, index) => (
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
                                        content="Legalización realizada correctamente"
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
