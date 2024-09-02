import  { useState, useEffect } from 'react';
import { TitleComponent, TableComponent } from '../components/';
import { Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UserCardComponent from '../components/UserCardComponet';
import { getInfoToken } from '../utils/utils';
import Loader from '../components/LoaderComponent.jsx';
import { useNavigate  } from 'react-router-dom';
import './studentRequestPage.css';

const StudentRequestPage = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const userInfo = getInfoToken();
    console.log(userInfo.sub)
    console.log('userInfo:', userInfo);
    const obtenerDatos = async () => {
      try {
        const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/getRequestsByStudent?page=1&username=${userInfo.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        setFilas(result.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerDatos();
  }, []);
  

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
        return <Tag color={color}>{status ? status : 'DESCONOCIDO'}</Tag>;
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
    const requestId = record.request_id; // o el campo adecuado que estás usando
    navigate(`/student/mi-solicitud?id=${requestId}`);
  };  

  return (
    <div className="relative h-screen scroll-container ml-4">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-12 w-12" /> 
        </div>
      ) : (
        <>
          <UserCardComponent number={2} />
          <div>
            <TitleComponent title={'Mis Solicitudes'} />
          </div>
          <div className="m-5">
            <TableComponent dataSource={filas} columns={columns} parameterAction={handleView} />
          </div>
          <div className="ml-5 mb-5">
            <Button to="/homePage" type="primary" className='color-button text-sm md:text-base lg:text-lg h-auto' icon={<ArrowLeftOutlined />}>Volver</Button>
          </div>
        </>
      )}
    </div>
  );
  
  
};

export default StudentRequestPage;
