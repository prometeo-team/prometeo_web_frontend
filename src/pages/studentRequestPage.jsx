import { TitleComponent, TableComponent } from '../components/';
import { Tag } from 'antd';
import './studentRequestPage.css'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const studentRequestPage = () => {

  const columns = [
    {
      title: 'Solicitud',
      dataIndex: 'id_solicitud',
      key: 'id_solicitud',
    },
    {
      title: 'Fecha de Creacion',
      dataIndex: 'fecha',
      key: 'fecha',
      sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),

    },
    {
      title: 'Estado de la solicitud',
      key: 'estado',
      dataIndex: 'estado',
      render: (estado) => {
        let color;
        if (estado === 'Iniciado') {
          color = 'green';
        } else if (estado === 'Proceso') {
          color = 'yellow';
        } else {
          (estado === 'Finalizado')
          color = 'red';
        }
        return (
          <Tag color={color}>
            {estado.toUpperCase()}
          </Tag>
        );
      },

    },
    {
      title: 'Tipo de Solicitud',
      dataIndex: 'tipo_solicitud',
      key: 'tipo_solicitud',
    }
  ];

  const handleView = (e, record) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para ver el registro
    console.log('Ver registro:', record.id_solicitud);
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
      id_solicitud: 'C231231',
      fecha: '2023-03-15',
      estado: 'Finalizado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-04-17',
      estado: 'Proceso',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {

      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
  ];

  return (
    <div className="mr-4 ml-4 mt-4">
      <div>
        <TitleComponent title={'Mis Solicitudes'} />
      </div>

      <div className="m-5">
        <TableComponent dataSource={dataSource} columns={columns} parameterAction={handleView} />
        
      </div>
      <div className="ml-5 mb-5">
         <Button to="/homePage" type="primary" className='color-button text-sm md:text-base lg:text-lg h-auto' icon={<ArrowLeftOutlined />}>Volver</Button>
      </div>
    </div>
  )
}

export default studentRequestPage
