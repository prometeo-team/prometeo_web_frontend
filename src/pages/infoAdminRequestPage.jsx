import UserCArdComponent from '../components/UserCardComponet';
import NavbarTypeComponent from '../components/NavbarTypeComponent';
import TableComponent from '../components/TableComponent';
import CardGraficsComponent from '../components/CardGraficsComponent';
import { Tag } from 'antd';
import '../App.css';

const InfoAdminRequestPage = () => {

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
      dataIndex: 'fecha',
      key: 'fecha',
      sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
    },
    {
      title: 'Estado',
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

  const dataSource = [
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-15',
      estado: 'Finalizado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-04-17',
      estado: 'Proceso',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {

      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
    {
      id_solicitud: 'C231231',
      name: 'Pepito Perez',
      fecha: '2023-03-16',
      estado: 'Iniciado',
      tipo_solicitud: 'Reintegro'
    },
  ];

  const data1 = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const data2 = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const data3 = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  return (
    <div className='w-full flex mr-24 h-screen'>
      <div className="w-full  mt-6 scroll-container flex flex-col">
        <div className='w-full mt-0 float-right h-20'>
          <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
        </div>
        <div className='w-full mt-6'>
          <NavbarTypeComponent />
        </div>
        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-2 w-11/12 flex flex-row'>
            <CardGraficsComponent type="1" number="2" grafico="grafico1" data={data1} />
            <CardGraficsComponent type="2" number="10" grafico="grafico2" data={data2} />
            <CardGraficsComponent type="3" number="10" grafico="grafico3" data={data3} />
          </div>
        </div>
        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
            <TableComponent dataSource={dataSource} columns={columns} parameterAction={handleView} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoAdminRequestPage;
