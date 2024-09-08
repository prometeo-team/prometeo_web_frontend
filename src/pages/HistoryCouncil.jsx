import { Table, Button, Pagination } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalActa from '../components/ModalActaInsert';
import { TitleComponent } from "../components/";
import { Input } from 'antd';
import UserCardComponent from '../components/UserCardComponet';

const { Search } = Input;

function CouncilTablePage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]); // Almacenará los datos de los documentos
    const [loading, setLoading] = useState(true); // Manejo del estado de carga
    const [page, setPage] = useState(1); // Página actual
    const [totalItems, setTotalItems] = useState(0); // Total de documentos
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
    const [pageSize, setPageSize] = useState(10); // Tamaño de la página

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    // Función para formatear la fecha en dd-mm-yyyy
    const formatDate = (dateString) => {
        // Intentar convertir la fecha de manera flexible
        const date = new Date(dateString);

        if (!isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        // Si no es una fecha válida, manejarla manualmente (en caso de fechas con "COT")
        const dateParts = dateString.split(' ');
        if (dateParts.length === 6) {
            const day = dateParts[2];
            const month = getMonthFromString(dateParts[1]);
            const year = dateParts[5];
            return `${day}-${month}-${year}`;
        }

        return dateString; // Si no se puede formatear, devolver el valor original
    };

    // Función auxiliar para convertir el nombre del mes en un número
    const getMonthFromString = (month) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = months.indexOf(month);
        return monthIndex !== -1 ? String(monthIndex + 1).padStart(2, '0') : '00';
    };

    // Función para obtener el nombre del archivo desde la URL
    const getFileNameFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1]; // Tomar el último segmento de la URL
    };

    // Función para obtener los documentos desde la API con paginación y búsqueda
    const fetchDocuments = async (currentPage = 1, query = "") => {
        setLoading(true);
        try {
            const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/getCouncilDocuments?page=${currentPage}&searchQuery=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result && result.data && result.data.content) {
                // Formatear los datos para la tabla
                const formattedData = result.data.content.map(item => ({
                    id_documento: item.id,
                    fecha: formatDate(item.uploaded_at), // Formatear la fecha
                    nombre: getFileNameFromUrl(item.url), // Obtener el nombre del archivo desde la URL
                    url: item.url, // URL para la descarga del documento
                    rawDate: new Date(item.uploaded_at), // Guardar la fecha cruda para ordenación
                }));

                // Ordenar los datos por fecha y asignar secuencia
                formattedData.sort((a, b) => a.rawDate - b.rawDate);
                const sequencedData = formattedData.map((item, index) => ({
                    ...item,
                    secuencia: index + 1 // Asignar la secuencia basada en la antigüedad
                }));

                setDataSource(sequencedData);
                setTotalItems(result.data.totalElements); // Total de documentos para la paginación
            }
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Ejecutar el fetch cuando el componente se monta o cambia la página o el query de búsqueda
    useEffect(() => {
        fetchDocuments(page, searchQuery);
    }, [page, searchQuery]);

    const handleSearch = (value) => {
        setSearchQuery(value); // Actualizamos el estado con el valor de búsqueda
        setPage(1); // Reiniciar a la primera página cuando se haga una búsqueda
    };

    // Definir las columnas de la tabla
    const columns = [
        {
            title: "Secuencia",
            dataIndex: "secuencia",
            key: "secuencia",
            sorter: (a, b) => a.secuencia - b.secuencia,
        },
        {
            title: "Fecha de Creación",
            dataIndex: "fecha",
            key: "fecha",
            sorter: (a, b) => new Date(a.rawDate) - new Date(b.rawDate),
        },
        {
            title: "Nombre",
            key: "nombre",
            render: (_, record) => (
                <a
                    href={record.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-link"
                >
                    {record.nombre}
                </a>
            ),
        }
    ];

    return (
        <div className='w-full flex mr-4 max-md:mr-0 h-screen scroll-container flex-col'>
            <div className="ml-8 mt-4">
                <UserCardComponent number={2} />
                <div>
                    <TitleComponent title={"Actas Consejo"} />
                </div>



                <div className="table-container">
                    <Search
                        placeholder="Buscar documentos..."
                        enterButton={
                            <Button style={{ backgroundColor: "#97B749", borderColor: "#97B749", color: "white" }}>
                                Buscar
                            </Button>
                        }
                        onSearch={handleSearch}
                        style={{
                            width: "60%",
                            borderRadius: "15px",
                            padding: "10px",
                        }}
                    />
                    <div className="overflow-x-auto whitespace-nowrap">
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            loading={loading}
                            pagination={false}
                            rowKey="id_documento"
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={(page) => setPage(page)}
                            showSizeChanger={false}
                        />
                    </div>
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
                        className="color-button text-sm md:text-base lg:text-lg h-aut mr-5"
                    >
                        Insertar Acta
                    </Button>
                    <ModalActa
                        visible={modalVisible}
                        onClose={handleCloseModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default CouncilTablePage;
