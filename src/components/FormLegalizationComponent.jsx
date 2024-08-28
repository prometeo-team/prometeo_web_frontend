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
    const [formData, setFormData] = useState({
        nombre: '',
        tipoDocumento: '',
        carrera: '',
        direccion: '',
        nombreAcudiente: '',
        etnia: '',
        apellidos: '',
        especificarTipoDocumento: '',
        semestreIngreso: '',
        localidad: '',
        celularEmergencia: '',
        tipoFinanciacion: '',
        celular: '',
        numeroDocumento: '',
        correoElectronico: '',
        especificarLocalidad: '',
        jornada: '',
        especificarFinanciacion: ''
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('file:///C:/Users/User/Documents/pruebaL.json');
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
            const studentData = await response.json(); // Suponiendo que los datos son JSON
            if (studentData.semestreIngreso === '1') {
              setFormData({
                ...formData,
                nombre: '',
                tipoDocumento: '',
                carrera: '',
                direccion: '',
                nombreAcudiente: '',
                etnia: '',
                apellidos: '',
                especificarTipoDocumento: '',
                semestreIngreso: '',
                localidad: '',
                celularEmergencia: '',
                tipoFinanciacion: '',
                celular: '',
                numeroDocumento: '',
                correoElectronico: '',
                especificarLocalidad: '',
                jornada: '',
                especificarFinanciacion: ''
              });
            } else {
              setFormData({
                ...formData,
                nombre: studentData.nombre || '',
                tipoDocumento: studentData.tipoDocumento || '',
                carrera: studentData.carrera || '',
                direccion: studentData.direccion || '',
                nombreAcudiente: studentData.nombreAcudiente || '',
                etnia: studentData.etnia || '',
                apellidos: studentData.apellidos || '',
                especificarTipoDocumento: studentData.especificarTipoDocumento || '',
                semestreIngreso: studentData.semestreIngreso || '',
                localidad: studentData.localidad || '',
                celularEmergencia: studentData.celularEmergencia || '',
                tipoFinanciacion: studentData.tipoFinanciacion || '',
                celular: studentData.celular || '',
                numeroDocumento: studentData.numeroDocumento || '',
                correoElectronico: studentData.correoElectronico || '',
                especificarLocalidad: studentData.especificarLocalidad || '',
                jornada: studentData.jornada || '',
                especificarFinanciacion: studentData.especificarFinanciacion || ''
              });
            }
          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };
    
        fetchData();
      }, []);


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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
                    <IoIosArrowBack className=" h-7 w-7" />
                    <span className="ml-2">Volver</span>
                </button>
            </Link>
            <h2 className="text-xl font-bold text-black mt-5 mb-5 ">Información del estudiante</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="max-w-xs">
                    <h3 className='text-black truncate'>Nombre(s)</h3>
                    <InputComponent type="string" placeholder="Ingrese su nombre" variant="form-input"  onChange={handleInputChange}/>
                    <h3 className='text-black truncate'>Tipo de documento</h3>
                    <InputComponent
                        type="box"
                        placeholder="Tipo de documento"
                        variant="form-input"
                        options={[
                            { value: 'SELECT', label: 'Seleccione una opción' },
                            { value: 'CC', label: 'Cédula de Ciudadanía' },
                            { value: 'CE', label: 'Cédula de Extranjería' },
                            { value: 'TI', label: 'Tarjeta de Identidad' },
                            { value: 'PS', label: 'Pasaporte' },
                            { value: 'RC', label: 'Registro Civil' },
                            { value: 'OTRA', label: 'Otra' },
                        ]}
                        value={formData.tipoDocumento}
                        onChange={handleInputChange}
                    />

                    <h3 className='text-black truncate'>Carrera</h3>
                    <InputComponent
                        type="box"
                        placeholder="Carrera"
                        variant="form-input"
                        options={[
                            { value: 'SELECT', label: 'Seleccione una opción' },
                            { value: 'BI', label: 'Bioingeniería' },
                            { value: 'IA', label: 'Ingeniería Ambiental' },
                            { value: 'IS', label: 'Ingeniería de Sistemas' },
                            { value: 'IE', label: 'Ingeniería Electrónica' },
                            { value: 'II', label: 'Ingeniería Industrial' },
                        ]}
                        value={formData.carrera}
                    />
                    <h3 className='text-black truncate'>Dirección</h3>
                    <InputComponent type="string" placeholder="Ingrese su dirección" variant="form-input" value={formData.direccion} />
                    <h3 className='text-black truncate'>Nombre acudiente</h3>
                    <InputComponent type="string" placeholder="Ingrese el nombre de su acudiente" variant="form-input" value={formData.nombreAcudiente} />
                    <h3 className='text-black truncate'>Etnia</h3>
                    <InputComponent
                        type="box"
                        label="Etnia"
                        placeholder="Seleccione su etnia"
                        options={[
                            { value: 'SELECT', label: 'Seleccione una opción' },
                            { value: "IND", label: "Indígena" },
                            { value: "AFRO", label: "Negro, Palenquero, Raizal" },
                            { value: "ROM", label: "Rom o Población Gitana" },
                            { value: "VICT", label: "Víctima de Conflicto" },
                            { value: "DESM", label: "Desmovilizado" },
                            { value: "FRON", label: "Población Habitante de Frontera" },
                            { value: "DIS", label: "Discapacitado" },
                            { value: "TAL", label: "Talentos Excepcionales" },
                            { value: "NING", label: "Ninguno" },
                        ]}
                        value={formData.etnia}
                    />
                </div>

                <div className="max-w-xs">
                    <h3 className="text-black truncate">Apellidos</h3>
                    <InputComponent type="string" placeholder="Ingrese sus apellidos" variant="form-input" value={formData.apellidos} />
                    <h3 className="text-black truncate">
                        <Tooltip title="Solo llenar si selecciono 'Otra' en tipo de documento">
                            <QuestionCircleOutlined className="font-color" />
                        </Tooltip> Especifique tipo de documento
                    </h3>
                    <InputComponent type="number" placeholder="Especifique tipo de documento" variant="form-input" value={formData.especificarTipoDocumento} />
                    <h3 className="text-black truncate">Semestre al que ingresa</h3>
                    <InputComponent type="string" placeholder="Ingrese su Semestre" variant="form-input" value={formData.semestreIngreso} />
                    <h3 className="text-black truncate">Localidad</h3>
                    <InputComponent
                        type="box"
                        placeholder="Selecciona una localidad"
                        variant="form-input"
                        options={[
                            { value: 'SELECT', label: 'Seleccione una opción' },
                            { value: 'USAQUEN', label: 'Usaquén' },
                            { value: 'CHAPINERO', label: 'Chapinero' },
                            { value: 'SANTAFE', label: 'Santa Fé' },
                            { value: 'SAN_CRISTOBAL', label: 'San Cristóbal' },
                            { value: 'USME', label: 'Usme' },
                            { value: 'TUNJUELITO', label: 'Tunjuelito' },
                            { value: 'BOSA', label: 'Bosa' },
                            { value: 'KENNEDY', label: 'Kennedy' },
                            { value: 'FONTIBON', label: 'Fontibón' },
                            { value: 'ENGATIVA', label: 'Engativá' },
                            { value: 'SUBA', label: 'Suba' },
                            { value: 'BARRIOS_UNIDOS', label: 'Barrios Unidos' },
                            { value: 'TEUSAQUILLO', label: 'Teusaquillo' },
                            { value: 'MARTIRES', label: 'Los Mártires' },
                            { value: 'ANTONIO_NARINO', label: 'Antonio Nariño' },
                            { value: 'PUENTE_ARANDA', label: 'Puente Aranda' },
                            { value: 'CANDELARIA', label: 'La Candelaria' },
                            { value: 'RAFAEL_URIBE', label: 'Rafael Uribe Uribe' },
                            { value: 'CIUDAD_BOLIVAR', label: 'Ciudad Bolívar' },
                            { value: 'SUMAPAZ', label: 'Sumapaz' },
                            { value: 'OTRA', label: 'Otra' },
                        ]}
                        value={formData.localidad}
                    />
                    <h3 className="text-black truncate">
                        <Tooltip title="Telefono o celular en caso de emergencia">
                            <QuestionCircleOutlined className=" font-color" />
                        </Tooltip> Celular de emergencia
                    </h3>
                    <InputComponent type="number" placeholder="Ingrese su número de celular" variant="form-input" value={formData.celularEmergencia} />
                    <h3 className="text-black truncate">Tipo de financiación</h3>
                    <InputComponent
                        type="box"
                        label="Programa"
                        placeholder="Seleccione su tipo de financiación"
                        options={[
                            { value: 'SELECT', label: 'Seleccione una opción' },
                            { value: "SER_PILO_PAGA", label: "Ser Pilo Paga" },
                            { value: "ICETEX", label: "Icetex" },
                            { value: "LUMNI", label: "Lumni" },
                            { value: "JOVENES_A_LA_U", label: "Jóvenes a la U" },
                            { value: "RETO_A_LA_U", label: "Reto a la U" },
                            { value: "INMERSION", label: "Inmersión" },
                            { value: "MOVILIDAD_NACIONAL", label: "Movilidad Nacional" },
                            { value: "MOVILIDAD_INTERNACIONAL", label: "Movilidad Internacional" },
                            { value: "RECURSOS_PROPIOS", label: "Ninguna - Recursos Propios" },
                            { value: "OTRA", label: "Otra" },
                        ]}
                        value={formData.tipoFinanciacion}
                    />
                </div>

                <div className="max-w-xs">
                    <h3 className='text-black truncate'>Celular</h3>
                    <InputComponent type="number" placeholder="Ingrese su número de celular" variant="form-input"
                        value={formData.celular} />
                    <h3 className="text-black truncate">No. de documento</h3>
                    <InputComponent type="number" placeholder="Ingrese su número de documento" variant="form-input"
                        value={formData.numeroDocumento} />
                    <h3 className='text-black truncate'>Correo electrónico</h3>
                    <InputComponent type="correo" placeholder="Ingrese su correo electrónico" variant="form-input"
                        value={formData.correoElectronico} />
                    <h3 className='text-black truncate'>
                        <Tooltip title="Solo llenar si se seleccionó 'Otra' en el campo localidad">
                            <QuestionCircleOutlined className="font-color" />
                        </Tooltip> Especifique localidad
                    </h3>
                    <InputComponent type="string" placeholder="Especifique Jornada" variant="form-input"
                        value={formData.especifiqueLocalidad} />
                    <h3 className='text-black truncate'>Jornada</h3>
                    <InputComponent
                        type="box"
                        placeholder="Carrera"
                        variant="form-input"
                        options={[
                            { value: 'DI', label: 'Diurna' },
                            { value: 'NO', label: 'Nocturna' },
                        ]}
                        value={formData.jornada}
                    />
                    <div className="truncate">
                        <h3 className="text-black">
                            <Tooltip title="Solo llenar si se seleccionó 'Otra' en el campo tipo de dinanciación">
                                <QuestionCircleOutlined className="font-color" />
                            </Tooltip> Especifique tipo de financiación
                        </h3>
                    </div>
                    <InputComponent type="string" placeholder="Especifique Jornada" variant="form-input" />
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
