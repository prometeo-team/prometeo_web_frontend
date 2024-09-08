import { useEffect, useState } from "react";
import { Input, Button, Table, Tag, Pagination } from 'antd';
import { FaEye } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiSearchCircle } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { TitleComponent } from "../components/";
import UserCardComponent from '../components/UserCardComponet';
import './councilFacultyPage.css';

const { Search } = Input;

const CouncilFacultyPage = () => {
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async (currentPage = 1, query = "") => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3030/api/request/getRequestCouncil?page=${currentPage}&searchQuery=${query}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            );
            const result = await response.json();
            if (result && result.data && result.data.content) {
                const formattedData = result.data.content.map(item => ({
                    id_solicitud: item.requestEntity.idRequest,
                    fecha: new Date(item.requestEntity.createdAt).toLocaleDateString(),
                    programa: item.requestEntity.programStudent || "Programa no disponible",
                    estado: item.requestDetailEntity.status.name,
                    tipo_solicitud: item.requestEntity.requestTypeEntity.nameType,
                }));
                setDataSource(formattedData);
                setTotalItems(result.data.totalItems); // Total de items para la paginación
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, searchQuery);
    }, [page]);

    const columns = [
        {
            title: "Solicitud",
            dataIndex: "id_solicitud",
            key: "id_solicitud",
        },
        {
            title: "Fecha de Creación",
            dataIndex: "fecha",
            key: "fecha",
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
                let color = estado === "Consejo" ? "cyan" : "red";
                return <Tag color={color}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Tipo de Solicitud",
            dataIndex: "tipo_solicitud",
            key: "tipo_solicitud",
        },
        {
            title: "Acción",
            key: "accion",
            render: (_, record) => (
                <FaEye
                    style={{ cursor: "pointer", color: "#97B749", fontSize: "20px" }}
                    onClick={() => navigate(`/admin/solicitud?id=${record.id_solicitud}&tipo=${record.tipo_solicitud}`)}
                />
            ),
        }
    ];

    const handleSearch = (value) => {
        setSearchQuery(value);
        setPage(1); // Resetear a la primera página cuando se hace una búsqueda
        fetchData(1, value); // Hacer fetch con la búsqueda
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
        <div className='h-screen scroll-container'>
            <div className="max-w-titleComponent">
                <UserCardComponent number={2} />
                <TitleComponent title="Inicio de Acta" />
            </div>

            <div className="table-container">
                <Search
                    placeholder="Buscar aquí..."
                    enterButton={
                        <Button style={{ backgroundColor: "#97B749", borderColor: "#97B749", color: "white" }}>
                            Buscar
                        </Button>
                    }
                    prefix={<HiSearchCircle className="w-6 h-6" style={{ color: "#97B749" }} />}
                    onSearch={handleSearch}
                    style={{
                        width: "60%",
                        borderRadius: "15x",
                        padding: "10px",
                    }}
                />
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    rowKey="id_solicitud"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                    <Pagination
                        current={page}
                        pageSize={10}
                        total={totalItems}
                        onChange={(page) => setPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            </div>

            {/* Sección adicional con los formatos de descarga */}
            <div className="flex justify-center">
                <div className='bg-white p-4 rounded-lg shadow-md m-5 w-1/2 max-md:w-full'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Formato PROMETEO</h2>
                            <h2 className="mt-4 text-wrap break-words">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold flex justify-between items-center">
                                    <p className="max-md:hidden">Descargar</p> <LuDownload className="ml-2 h-7 w-8" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className='bg-white p-4 rounded-lg shadow-md m-5 w-1/2 max-md:w-full max-md:h-auto'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Acta de consejo</h2>
                            <h2 className="mt-4 text-wrap break-words">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold flex justify-between items-center">
                                    <p className="max-md:hidden">Descargar</p> <LuDownload className="ml-2 h-7 w-8" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4"></div>
                </div>
            </div>
        </div>
    );
};

export default CouncilFacultyPage;
