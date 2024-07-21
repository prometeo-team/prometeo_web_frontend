import { TitleComponent } from "../components/";
import { LuDownload } from "react-icons/lu";
import { BsChatLeftTextFill } from "react-icons/bs";
import { Button } from 'antd';
import ModalCouncilFacultyComponent from '../components/ModalCouncilFacultyComponent';
import { useState } from 'react';
import { LuUpload } from "react-icons/lu";
import { Tag } from "antd";
import { TableComponent } from "../components/";
import UserCardComponent from '../components/UserCardComponet';

const CouncilFacultyPage = () => {
    const [modalVisible, setModalVisible] = useState(false);


    const handleOpenModal = () => {
        setModalVisible(true);

    };

    const handleCloseModal = () => {
        setModalVisible(false);

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

    const columns = [
        {
            title: "Solicitud",
            dataIndex: "id_solicitud",
            key: "id_solicitud",
        },
        {
            title: "Fecha de Creacion",
            dataIndex: "fecha",
            key: "fecha",
            sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
        },
        {
            title: "Programa",
            dataIndex: "programa",
            key: "programa",
        },
        {
            title: "Estado de la solicitud",
            key: "estado",
            dataIndex: "estado",
            render: (estado) => {
                let color;
                if (estado === "Consejo") {
                    color = "cyan";
                } else {
                    estado === "Finalizado";
                    color = "red";
                }
                return <Tag color={color}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Tipo de Solicitud",
            dataIndex: "tipo_solicitud",
            key: "tipo_solicitud",
        },
    ];

    const handleView = (e, record) => {
        e.preventDefault();
        // Aquí se puede agregar la lógica para ver el registro
        console.log("Ver registro:", record.id_solicitud);
    };

    const dataSource = [
        {
            id_solicitud: "C231231",
            fecha: "2023-03-15",
            programa: "Bioingeniería",
            estado: "Finalizado",
            tipo_solicitud: "Reintegro",
        },
        {
            id_solicitud: "C231231",
            fecha: "2023-04-17",
            programa: "Bioingeniería",
            estado: "Consejo",
            tipo_solicitud: "Reintegro",
        },
        {
            id_solicitud: "C231231",
            fecha: "2023-03-16",
            programa: "Bioingeniería",
            estado: "Iniciado",
            tipo_solicitud: "Reintegro",
        },
        {
            id_solicitud: "C231231",
            fecha: "2023-03-16",
            programa: "Bioingeniería",
            estado: "Iniciado",
            tipo_solicitud: "Reintegro",
        },
        {
            id_solicitud: "C231231",
            fecha: "2023-03-16",
            programa: "Bioingeniería",
            estado: "Iniciado",
            tipo_solicitud: "Reintegro",
        },
        {
            id_solicitud: "C231231",
            fecha: "2023-03-16",
            programa: "Bioingeniería",
            estado: "Iniciado",
            tipo_solicitud: "Reintegro",
        },
    ];

    const filteredConsejoRows = dataSource.filter(
        (item) => item.estado === "Consejo"
    );

    // Filtrar las filas con estados diferentes a "Consejo"
    const filteredOtherRows = dataSource.filter(
        (item) => item.estado !== "Consejo"
    );

    const combinedDataSource = [...filteredConsejoRows, ...filteredOtherRows];

    return (
        <div>
            <div className="max-w-titleComponent">
            <UserCardComponent  number={2} />
                <TitleComponent title="Inicio de Acta" />
            </div>
            <div className="m-5">
                <TableComponent
                    dataSource={combinedDataSource}
                    columns={columns}
                    parameterAction={handleView}
                />
            </div>
            <div className="flex justify-center">
                <div className='councill-container bg-white p-4 rounded-lg shadow-md m-5 w-1/2'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Formato PROMETEO</h2>
                            <h2 className="mt-4">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center ">
                                    Descargar <LuDownload className="ml-2 h-7 w-7" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className='councill-container bg-white p-4 rounded-lg shadow-md m-5 w-1/2'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Acta de consejo</h2>
                            <h2 className="mt-4">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema prometeo</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center ">
                                    Descargar <LuDownload className="ml-2 h-7 w-7" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Button onClick={handleOpenModal} className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                            Subir acta <LuUpload className="ml-2 h-7 w-7" />
                        </Button>
                        <ModalCouncilFacultyComponent
                            visible={modalVisible}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouncilFacultyPage;
