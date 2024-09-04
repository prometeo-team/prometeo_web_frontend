import  { useState, useEffect } from 'react';
import UserCArdComponent from '../components/UserCardComponet';
import NavbarTypeComponent from '../components/NavbarTypeComponent';
import TableComponent from '../components/TableComponent';
import CardGraficsComponent from '../components/CardGraficsComponent';
import { Tag } from 'antd';
import { useNavigate  } from 'react-router-dom';
import '../App.css';

const InfoAdminRequestPage = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);
  const [Pendiente, setPendiente] = useState([]);
  const [proceso, setProceso] = useState([]);
  const [Fin, setFin] = useState([]);
  var totalPendiente=0;
  var totalProceso=0;
  var totalFin=0;
  useEffect(() => {
    //fetchGrafics('');
    obtenerDatos('');
  }, []);

  const fetchGrafics = async (filter) =>{
    try{
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/requestMonthlyStatistics${filter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.status === "200 OK") {
        setPendiente(result.data.pendingRequests.map(info => ({
          date: info.date,
          count: info.count
        })));
        setProceso(result.data.inProcessRequests.map(info => ({
          date: info.date,
          count: info.count
        })));
        setFin(result.data.finishedRequests.map(info => ({
          date: info.date,
          count: info.count
        })));
        totalProceso = proceso.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count;
        }, 0);
        totalFin = Pendiente.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count;
        }, 0);
         totalFin = Fin.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count;
        }, 0);
      }else {
        console.error("Error en la respuesta:", result.message);
      }
    }catch(error){
      console.error("Error al obtener los datos:", error);
    }
  }
  const columns = [
    {
      title: 'Solicitud',
      dataIndex: 'id_solicitud',
      key: 'id_solicitud',
    },
    {
      title: 'Solicitante',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'tipo_solicitud',
      key: 'tipo_solicitud',
    }
  ];

  const obtenerDatos = async (caso) => {
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/getAllRequest?page=1&&carrer=Ing Ambiental${caso}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      const extractedData = result.data.content.map(item => ({
        id_solicitud: item.requestEntity.idRequest,
        name: `${item.requestEntity.userEntity.name} ${item.requestEntity.userEntity.lastName}`,
        createdAt: item.requestEntity.createdAt,
        status: item.requestDetailEntity.status.name,
        tipo_solicitud: item.requestEntity.requestTypeEntity.nameType,
        
      }));
      console.log('fetch '+extractedData)
      setFilas(extractedData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } 
  };

  const handleView = (e, record) => {
    e.preventDefault();
    navigate(`/admin/solicitud?id=${record.id_solicitud}&tipo=${record.tipo_solicitud}`);
  };
  


  const handleClickType = (option) => {
    // Elimina la clase 'active' de todos los elementos
    const elements = document.querySelectorAll('[name="process"]');
    elements.forEach(element => {
      element.classList.remove('active');
      element.classList.add('inactive');
    });
  
    // Añade la clase 'active' al elemento seleccionado
    const selectedElement = document.getElementById(option);
    if (selectedElement) {
      selectedElement.classList.add('active');
      selectedElement.classList.remove('inactive');
    }
  
    // Realiza la solicitud fetch
    // fetchGrafics('?requestType=' + option);
  };

  return (
    <div className='w-full flex mr-24 max-md:mr-0 h-screen scroll-container flex-col'>
        <div className='w-full mt-0 float-right h-20'>
          <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
        </div>
        <div className='w-full mt-6'>
          <NavbarTypeComponent onClick={handleClickType}/>
        </div>
        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-2 w-11/12 flex flex-row'>
            <CardGraficsComponent type="1" number={totalPendiente} grafico="grafico1" data={Pendiente} />
            <CardGraficsComponent type="2" number={totalProceso} grafico="grafico2" data={proceso} />
            <CardGraficsComponent type="3" number={totalFin} grafico="grafico3" data={Fin} />
          </div>
        </div>
        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
            <TableComponent dataSource={filas} columns={columns} parameterAction={handleView} />
          </div>
        </div>
    </div>
  )
}

export default InfoAdminRequestPage;
