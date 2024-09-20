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
    const [role, setRole] = useState('');
    const [isTokenProcessed, setIsTokenProcessed] = useState(false);


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );
                const decodedToken = JSON.parse(jsonPayload);
                if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
                    setRole('ROLE_ACADEMIC');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        setIsTokenProcessed(true);
    }, []);


    const fetchData = async (currentPage = 1, query = "") => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getRequestCouncil?page=${currentPage}&searchQuery=${query}`,
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

    const handleClick = () => {
        navigate('/admin/historial-consejo');
    };

    const handleDownloadPrometeo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/council/getDocumentTemplateCouncil`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result && result.data) {
                    // Extraer la URL real del JSON
                    const url = result.data.split('https://')[1];
                    if (url) {
                        window.open(`https://${url}`, '_blank'); // Abrir URL en una nueva pestaña
                    } else {
                        console.error('URL no encontrada en la respuesta de Prometeo');
                    }
                } else {
                    console.error('Error en la respuesta de Prometeo:', result);
                }
            } else {
                console.error('Error al obtener el archivo Prometeo:', response.statusText);
            }
        } catch (error) {
            console.error('Error al descargar el archivo Prometeo:', error);
        }
    };

    const handleDownloadActaConsejo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/council/getExcelCouncil`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result && result.data) {
                    // Extraer la URL real del JSON
                    const url = result.data.split('https://')[1];
                    if (url) {
                        window.open(`https://${url}`, '_blank'); // Abrir URL en una nueva pestaña
                    } else {
                        console.error('URL no encontrada en la respuesta de Acta de Consejo');
                    }
                } else {
                    console.error('Error en la respuesta de Acta de Consejo:', result);
                }
            } else {
                console.error('Error al obtener el archivo Acta de Consejo:', response.statusText);
            }
        } catch (error) {
            console.error('Error al descargar el archivo Acta de Consejo:', error);
        }
    };



    return (
        <div className='h-screen scroll-container'>
            <div className="max-w-titleComponent">
                <UserCardComponent number={2} />
                <TitleComponent title="Inicio de Acta" />
            </div>

            <div className="table-container p-4">
                <Search
                    placeholder="Buscar aquí..."
                    enterButton={
                        <Button style={{ backgroundColor: "#97B749", borderColor: "#97B749", color: "white" }}>
                            Buscar
                        </Button>
                    }
                    prefix={<HiSearchCircle className="w-6 h-6" style={{ color: "#97B749" }} />}
                    onSearch={handleSearch}
                    className="mb-4"
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
                        rowKey="id_solicitud"
                        className="min-w-max"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <Pagination
                        current={page}
                        pageSize={10}
                        total={totalItems}
                        onChange={(page) => setPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            </div>
            <div className="flex flex-wrap w-full">
                <div className='bg-white p-4 rounded-lg shadow-md m-5 w-full custom-item'>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Formato PROMETEO</h2>
                            <h2 className="mt-4 text-wrap break-words">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="lg:col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownloadPrometeo} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold flex justify-center items-center">
                                    <p className="flex-1 text-center">Descargar</p> <LuDownload className="ml-2 h-7 w-8" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md m-5 w-full custom-item'>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Acta de consejo</h2>
                            <h2 className="mt-4 text-wrap break-words">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="lg:col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownloadActaConsejo} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold flex justify-center items-center">
                                    <p className="flex-1 text-center">Descargar</p> <LuDownload className="ml-2 h-7 w-8" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {role === 'ROLE_ACADEMIC' && (
                <div className="flex justify-center items-center w-full mb-4">
                    <Button
                        onClick={handleClick}
                        className="w-36 h-12 text-white rounded-lg shadow-md color-button font-bold flex justify-center items-center"
                    >
                        <p>Historial de actas</p>
                    </Button>
                </div>
            )}

        </div>
    );
};

export default CouncilFacultyPage;
