import { TitleComponent, TableComponent } from "../components/";
import "./studentRequestPage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ModalActa from '../components/ModalActaInsert';
import { notification } from 'antd';
import { IoAlertCircleSharp } from "react-icons/io5";

function councilTablePage() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);

    };

    const handleCloseModal = () => {
        setModalVisible(false);
        notification.info({
            message: 'Importante',
            description: 'Recuerda que para poder modificar o eliminar el archivo, haz clic en el botón "Subir Acta".',
            placement: 'bottomRight',
            icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
        });
    };


    const columns = [
        {
            title: "Documento",
            dataIndex: "id_documento",
            key: "id_documento",
        },
        {
            title: "Fecha de Creacion",
            dataIndex: "fecha",
            key: "fecha",
            sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
        },
        {
            title: "URL Acceso",
            dataIndex: "URL",
            key: "URL",
        },
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
    ];

    const handleView = (e, record) => {
        e.preventDefault();
        // Aquí se puede agregar la lógica para ver el registro
        console.log("Ver registro:", record.id_solicitud);
    };

    /*const [filas, setFilas] = useState([]);
      
        useEffect(() => {
          // Obtener los datos del JSON y almacenarlos en la variable de estado 'filas'
          const obtenerDatos = async () => {
            const response = await fetch('/api/datos');
            const data = await response.json();
            setFilas(data);
          };
          obtenerDatos();
        }, []);*/

    const dataSource = [
        {
            id_documento: "C231231",
            fecha: "2023-03-15",
            URL: "www.dasdada.com",
            nombre: "Acta de consejo 1",
        },
        {
            id_documento: "C231232",
            fecha: "2023-04-10",
            URL: "www.example1.com",
            nombre: "Acta de consejo 2"
        },
        {
            id_documento: "C231233",
            fecha: "2023-05-20",
            URL: "www.example2.com",
            nombre: "Acta de consejo 3"
        },
        {
            id_documento: "C231234",
            fecha: "2023-06-15",
            URL: "www.example3.com",
            nombre: "Acta de consejo 4"
        },
        {
            id_documento: "C231235",
            fecha: "2023-07-05",
            URL: "www.example4.com",
            nombre: "Acta de consejo 5"
        },
        {
            id_documento: "C231236",
            fecha: "2023-08-25",
            URL: "www.example5.com",
            nombre: "Acta de consejo 6"
        }

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
        <div className="mr-4 ml-4 mt-4">
            <div>
                <TitleComponent title={"Actas Consejo"} />
            </div>

            <div className="m-5">
                <TableComponent
                    dataSource={combinedDataSource}
                    columns={columns}
                    parameterAction={handleView}
                />
            </div>
            <div className="ml-5 mb-5 flex justify-between">
                <Link to="/admin/consejo-facultad">
                    <Button
                        type="primary"
                        className="color-button text-sm md:text-base lg:text-lg h-auto"
                        icon={<ArrowLeftOutlined />}
                    >
                        Volver
                    </Button>
                </Link>

                <Button
                    onClick={handleOpenModal}
                    type="primary"
                    className="color-button text-sm md:text-base lg:text-lg h-auto"
                >
                    Insertar Acta
                </Button>
                <ModalActa
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    //setDocuments={setDocuments}
                />
            </div>


        </div>
    );
}

export default councilTablePage;
