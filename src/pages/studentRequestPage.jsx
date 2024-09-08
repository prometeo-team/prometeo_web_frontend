import { useState, useEffect } from 'react';
import { Table, Tag, Button, Pagination, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UserCardComponent from '../components/UserCardComponet';
import { getInfoToken } from '../utils/utils';
import Loader from '../components/LoaderComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { TitleComponent } from '../components/';
import { HiSearchCircle } from "react-icons/hi";
import './studentRequestPage.css';

const { Search } = Input;

const StudentRequestPage = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]); // Aseguramos que filas sea un arreglo
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // Página actual
  const [totalItems, setTotalItems] = useState(0); // Total de solicitudes
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el buscador

  useEffect(() => {
    const userInfo = getInfoToken();

    const obtenerDatos = async () => {
      setIsLoading(true); // Activar el estado de cargando
      try {
        const response = await fetch(`http://127.0.0.1:3030/api/request/getRequestsByStudent?page=${page}&username=${userInfo.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        setFilas(result.data?.content || []); // Aseguramos que filas sea un arreglo
        setTotalItems(result.data.totalItems); // Total de items proporcionados por el backend
        setTotalPages(result.data.totalPages); // Total de páginas proporcionadas por el backend
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false); // Desactivar el estado de cargando
      }
    };

    obtenerDatos();
  }, [page]);

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
          color = 'red';
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
  ];

  const handleView = (e, record) => {
    e.preventDefault();
    const requestId = record.request_id;
    navigate(`/student/mi-solicitud?id=${requestId}&tipo=${record.requestTypeEntity.nameType}`);
  };

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase()); // Actualizamos el estado con el valor de búsqueda
  };

  // Filtrar filas basado en el query de búsqueda, aseguramos que filas sea un arreglo
  const filteredData = Array.isArray(filas)
    ? filas.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery)
      )
    )
    : [];

  return (
    <div className="student-request-page">
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
            <div className="table-responsive" style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="request_id"
                pagination={false}
              />
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
