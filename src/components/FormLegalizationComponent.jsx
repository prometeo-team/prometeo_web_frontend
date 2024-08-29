import React from 'react';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import ModalLegalizationComponent from '../components/ModalLegalizationComponent';
import InputComponent from '../components/InputComponent';
import './FormLegalizationComponent.css';
import { LuUpload } from "react-icons/lu";
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
    const [formData, setFormData] = useState({});

    const user = sessionStorage.getItem('user');
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const career = params.get('carrera');

    useEffect(() => {
        fetchLegalizationInfo();
    }, []);

    const fetchLegalizationInfo = async () => {
        if (user && career) {
            try {
                const response = await fetch(`http://localhost:3030/api/user/getLegalizationInfoStudent?username=${user}&career=${career}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setFormData(result.data[0]); // Establece los datos iniciales
                } else {
                    console.error("Error en la respuesta:", result.message);
                }
            } catch (error) {
                console.error("Error al obtener la información de legalización:", error);
            }
        } else {
            console.error("Los parámetros 'user' o 'career' no están presentes");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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

    console.log(formData);

    return (
        <div className='legalization-container bg-white p-4 rounded-lg shadow-md m-5 warp margenL'>
            <Link to='/student/crear-solicitud'>
                <button className='w-auto h-auto font-bold text-lg flex items-center mb-5 font-color'>
                    <IoIosArrowBack className="h-7 w-7" />
                    <span className="ml-2">Volver</span>
                </button>
            </Link>
            <h2 className="text-xl font-bold text-black mt-5 mb-5 ">Información del estudiante</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="max-w-xs">
                    <h3 className='text-black truncate'>Nombre(s)</h3>
                    <InputComponent
                        type="string"
                        name="name"
                        placeholder="Ingrese su nombre"
                        variant="form-input"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Tipo de documento</h3>
                    <InputComponent
                        type="box"
                        name="document_type"
                        placeholder="Seleccione una opción"
                        variant="form-input"
                        options={[
                            { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
                            { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
                            { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad' },
                            { value: 'Pasaporte', label: 'Pasaporte' },
                            { value: 'Registro Civil', label: 'Registro Civil' },
                            { value: 'Otro', label: 'Otro' },
                        ]}
                        value={formData?.document_type || 'SELECT'}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Carrera</h3>
                    <InputComponent
                        type="readOnly"
                        placeholder="Carrera"
                        variant="form-input"
                        value={'' || career}
                    />

                    <h3 className='text-black truncate'>Dirección</h3>
                    <InputComponent
                        type="string"
                        name="address"
                        placeholder="Ingrese su dirección"
                        variant="form-input"
                        value={formData?.address || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Nombre acudiente</h3>
                    <InputComponent
                        type="string"
                        name="attendant_name"
                        placeholder="Ingrese el nombre de su acudiente"
                        variant="form-input"
                        value={formData?.attendant_name || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Etnia</h3>
                    <InputComponent
                        type="box"
                        name="ethnic_group"
                        placeholder="Seleccione su etnia"
                        variant="form-input"
                        options={[
                            { value: 'Seleccione una opción', label: 'Seleccione una opción' },
                            { value: "Indígena", label: "Indígena" },
                            { value: "Negro, Palenquero, Raizal", label: "Negro, Palenquero, Raizal" },
                            { value: "Rom o Población Gitana", label: "Rom o Población Gitana" },
                            { value: "Víctima de Conflicto", label: "Víctima de Conflicto" },
                            { value: "Desmovilizado", label: "Desmovilizado" },
                            { value: "Población Habitante de Frontera", label: "Población Habitante de Frontera" },
                            { value: "Discapacitado", label: "Discapacitado" },
                            { value: "Talentos Excepcionales", label: "Talentos Excepcionales" },
                            { value: "Ninguno", label: "Ninguno" },
                        ]}
                        value={formData?.ethnic_group || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="max-w-xs">
                    <h3 className="text-black truncate">Apellidos</h3>
                    <InputComponent
                        type="string"
                        name="last_name"
                        placeholder="Ingrese sus apellidos"
                        variant="form-input"
                        value={formData?.last_name || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">
                        <Tooltip title="Solo llenar si selecciono 'Otro' en tipo de documento">
                            <QuestionCircleOutlined className="font-color" />
                        </Tooltip> Especifique tipo de documento
                    </h3>
                    <InputComponent
                        type={formData?.document_type === 'Otro' ? 'string' : 'readOnly'}
                        name="other_document_type"
                        placeholder="Especifique tipo de documento"
                        variant="form-input"
                        value={formData?.other_document_type || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">Semestre al que ingresa</h3>
                    <InputComponent
                        type="string"
                        name="period"
                        placeholder="Ingrese su Semestre"
                        variant="form-input"
                        value={formData?.period || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">Localidad</h3>
                    <InputComponent
                        type="box"
                        name="location"
                        placeholder="Ingrese su localidad"
                        variant="form-input"
                        options={[
                            { value: 'Seleccione una opción', label: 'Seleccione una opción' },
                            { value: 'Usaquén', label: 'Usaquén' },
                            { value: 'Chapinero', label: 'Chapinero' },
                            { value: 'Santa Fé', label: 'Santa Fé' },
                            { value: 'San Cristóbal', label: 'San Cristóbal' },
                            { value: 'Usme', label: 'Usme' },
                            { value: 'Tunjuelito', label: 'Tunjuelito' },
                            { value: 'Bosa', label: 'Bosa' },
                            { value: 'Kennedy', label: 'Kennedy' },
                            { value: 'Fontibón', label: 'Fontibón' },
                            { value: 'Engativá', label: 'Engativá' },
                            { value: 'Suba', label: 'Suba' },
                            { value: 'Barrios Unidos', label: 'Barrios Unidos' },
                            { value: 'Teusaquillo', label: 'Teusaquillo' },
                            { value: 'Los Mártires', label: 'Los Mártires' },
                            { value: 'Antonio Nariño', label: 'Antonio Nariño' },
                            { value: 'Puente Aranda', label: 'Puente Aranda' },
                            { value: 'La Candelaria', label: 'La Candelaria' },
                            { value: 'Rafael Uribe Uribe', label: 'Rafael Uribe Uribe' },
                            { value: 'Ciudad Bolívar', label: 'Ciudad Bolívar' },
                            { value: 'Sumapaz', label: 'Sumapaz' },
                            { value: 'Otra', label: 'Otra' },
                        ]}                        
                        value={formData?.location || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">
                        <Tooltip title="Teléfono o celular en caso de emergencia">
                            <QuestionCircleOutlined className="font-color" />
                        </Tooltip> Celular de emergencia
                    </h3>
                    <InputComponent
                        type="string"
                        name="attendant_phone"
                        placeholder="Ingrese su número de celular"
                        variant="form-input"
                        value={formData?.attendant_phone || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">Tipo de financiación</h3>
                    <InputComponent
                        type="box"
                        name="tuition_financing"
                        placeholder="Ingrese su tipo de financiación"
                        variant="form-input"
                        options={[
                            { value: 'Seleccione una opción', label: 'Seleccione una opción' },
                            { value: "Ser Pilo Paga", label: "Ser Pilo Paga" },
                            { value: "Icetex", label: "Icetex" },
                            { value: "Lumni", label: "Lumni" },
                            { value: "Jóvenes a la U", label: "Jóvenes a la U" },
                            { value: "Reto a la U", label: "Reto a la U" },
                            { value: "Inmersión", label: "Inmersión" },
                            { value: "Movilidad Nacional", label: "Movilidad Nacional" },
                            { value: "Movilidad Internacional", label: "Movilidad Internacional" },
                            { value: "Ninguna - Recursos Propios", label: "Ninguna - Recursos Propios" },
                            { value: "Otra", label: "Otra" },
                        ]}                        
                        value={formData?.tuition_financing || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="max-w-xs">
                    <h3 className='text-black truncate'>Celular</h3>
                    <InputComponent
                        type="string"
                        name="phone"
                        placeholder="Ingrese su número de celular"
                        variant="form-input"
                        value={formData?.phone || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-black truncate">No. de documento</h3>
                    <InputComponent
                        type="string"
                        name="document_number"
                        placeholder="Ingrese su número de documento"
                        variant="form-input"
                        value={formData?.document_number || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Correo electrónico</h3>
                    <InputComponent
                        type="readOnly"
                        placeholder="Ingrese su correo electrónico"
                        variant="form-input"
                        value={'' || user + "@unbosque.edu.co"}
                    />

                    <h3 className='text-black truncate'>
                        <Tooltip title="Solo llenar si se seleccionó 'Otra' en el campo localidad">
                            <QuestionCircleOutlined className="font-color" />
                        </Tooltip> Especifique localidad
                    </h3>
                    <InputComponent
                        type={formData?.location === 'Otra' ? 'string' : 'readOnly'}
                        name="specific_location"
                        placeholder="Especifique su localidad"
                        variant="form-input"
                        value={formData?.specific_location || ''}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Jornada</h3>
                    <InputComponent
                        type="box"
                        name="study_time"
                        placeholder="Jornada"
                        variant="form-input"
                        options={[
                            { value: 'DI', label: 'Diurna' },
                            { value: 'NO', label: 'Nocturna' },
                        ]}
                        value={formData?.study_time || ''}
                        onChange={handleInputChange}
                    />

                    <div className="truncate">
                        <h3 className="text-black">
                            <Tooltip title="Solo llenar si se seleccionó 'Otra' en el campo tipo de financiación">
                                <QuestionCircleOutlined className="font-color" />
                            </Tooltip> Especifique tipo de financiación
                        </h3>
                        <InputComponent
                        type={formData?.tuition_financing === 'Otra' ? 'string' : 'readOnly'}
                            name="specific_financing"
                            placeholder="Especifique tipo de financiación"
                            variant="form-input"
                            value={formData?.specific_financing || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        onClick={handleOpenModal}
                        className="warp2 button w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center md:button-small"
                    >
                        Subir archivos <LuUpload className="ml-2 h-7 w-7 icon-small" />
                    </Button>
                    <ModalLegalizationComponent
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        setDocuments={setDocuments}
                    />
                </div>
            </div>

            <div>
                <div className="w-full border-t border-black mt-2"></div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-black mt-5 mb-5">
                    Documentos
                    <Tooltip title="Para poder modificar o eliminar uno o varios archivos documentos, haz clic en el botón 'Subir archivos'">
                        <QuestionCircleOutlined className="font-color ml-2" />
                    </Tooltip>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
