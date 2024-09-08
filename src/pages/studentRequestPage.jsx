import { useState, useEffect } from 'react';
import { Table, Tag, Button, Pagination, Input, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UserCardComponent from '../components/UserCardComponet';
import { getInfoToken } from '../utils/utils';
import Loader from '../components/LoaderComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { TitleComponent } from '../components/';
import { HiSearchCircle } from "react-icons/hi";
import { FaEye } from 'react-icons/fa';
import './studentRequestPage.css';

const { Search } = Input;

const StudentRequestPage = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]); // Aseguramos que filas sea un arreglo
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(false); // Estado para el loader de la tabla
  const [page, setPage] = useState(1); // Página actual
  const [totalItems, setTotalItems] = useState(0); // Total de solicitudes
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el buscador

  // Modificar el fetch para incluir el searchQuery
  const obtenerDatos = async (currentPage = 1, query = "") => {
    setIsTableLoading(true); // Activar el estado de cargando para la tabla
    try {
      const userInfo = getInfoToken();

      // Asegurarse de que la URL y la petición sean correctas.
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/getRequestsByStudent?page=${currentPage}&username=${userInfo.sub}&search_query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }

      const result = await response.json();
      setIsLoading(false);
      
      if (result && result.data) {
        setFilas(result.data?.content || []); // Aseguramos que filas sea un arreglo
        setTotalItems(result.data.totalItems); // Total de items proporcionados por el backend
      } else {
        console.error('Error en la estructura de la respuesta', result);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    // Llamar obtenerDatos al cambiar la página o el query
    obtenerDatos(page, searchQuery);
  }, [page, searchQuery]); // Escuchar tanto `page` como `searchQuery`

  const columns = [
    {
      title: 'Solicitud',
      dataIndex: 'request_id',
      key: 'request_id',
    },
    {
      title: 'Fecha de Creacion',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text) => {
        const date = new Date(text);
        const formattedDate = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return formattedDate;
      },
    },
    {
      title: 'Estado de la solicitud',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        if (status === 'Iniciado') {
          color = 'green';
        } else if (status === 'En Verificacion') {
          color = '#F1C40F';
        } else if (status === 'En Finanzas') {
          color = 'blue';
        } else if (status === 'Consejo') {
          color = 'cyan';
        } else if (status === 'No valida') {
          color = 'volcano';
        }
        return <Tag color={color}>{status || 'DESCONOCIDO'}</Tag>;
      },
    },
    {
      title: 'Tipo de Solicitud',
      key: 'tipo_solicitud',
      render: (text, record) => record.requestTypeEntity.nameType,
    },
    {
      title: 'Programa de Estudiante',
      dataIndex: 'programStudent',
      key: 'programStudent',
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <FaEye
          style={{ cursor: "pointer", color: "#97B749", fontSize: "20px" }}
          onClick={() => navigate(`/student/mi-solicitud?id=${record.request_id}&tipo=${record.requestTypeEntity.nameType}`)}
        />
      ),
    }
  ];

  // Actualizamos la búsqueda y hacemos el llamado al endpoint con el query
  const handleSearch = (value) => {
    setSearchQuery(value); // Actualizamos el estado de búsqueda
    setPage(1); // Reseteamos a la primera página cuando se hace una búsqueda
  };

  return (
    <div className="w-full flex mr-4 max-md:mr-0 h-screen scroll-container flex-col">
      {isLoading ? (
        <div className="loader-container">
          <Loader className="h-12 w-12" />
        </div>
      ) : (
        <>
          <UserCardComponent number={2} />
          <div>
            <TitleComponent title={'Mis Solicitudes'} />
          </div>

          <div className="table-container ">
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
                borderRadius: "15px",
                padding: "10px",
              }}
            />
            <div className="table-responsive" style={{ overflowX: 'auto', maxWidth: '100%' }}>
              {isTableLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin size="large" /> {/* Loader solo para la tabla */}
                </div>
              ) : (
                <Table
                  dataSource={filas} // Ya no es filtrado localmente, el servidor devuelve los resultados
                  columns={columns}
                  rowKey="request_id"
                  pagination={false}
                />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <Pagination
                current={page}
                pageSize={10} // Asumimos 10 elementos por página
                total={totalItems} // Total de items desde el backend
                onChange={(page) => setPage(page)} // Actualiza la página actual
                showSizeChanger={false} // Deshabilitamos el cambio de tamaño de página
              />
            </div>
          </div>

          <div className="ml-5 mb-5">
            <Button
              onClick={() => navigate('/homePage')}
              type="primary"
              className="color-button text-sm md:text-base lg:text-lg h-auto"
              icon={<ArrowLeftOutlined />}
              style={{ backgroundColor: "#97B749", borderColor: "#97B749", color: "white" }}
            >
              Volver
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentRequestPage;
