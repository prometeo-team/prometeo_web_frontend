import  TitleComponent from "../components/TitleComponent";
import DegreeTableComponent  from "../components/DegreeTableComponent";
import UserCArdComponent from '../components/UserCardComponet';

function degreeTablePage() {
  const columns = [
    {
      title: "Documento",
      dataIndex: "id_documento",
      key: "id_documento",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
    },
  ];

  const handleView = (e, record) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para ver el registro
    console.log("Ver registro:", record.id_documento);
  };

  /*const [filas, setFilas] = useState([]);
    
      useEffect(() => {
        // Obtener los datos del JSON y almacenarlos en la variable de apellidos 'filas'
        const obtenerDatos = async () => {
          const response = await fetch('/api/datos');
          const data = await response.json();
          setFilas(data);
        };
        obtenerDatos();
      }, []);*/

  const dataSource = [
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
    {
      id_documento: "100000000",
      nombre: "Pepito",
      apellidos: "Perez Perez",
    },
  ];




  return (
    <div className='w-full flex mr-24 max-md:mr-0 h-screen scroll-container flex-col'>
        <div className='w-full mt-0 float-right h-20'>
          <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
        </div>
        <div className='w-full mt-6'>
          <TitleComponent title={"Postulacion a Grados"} />
        </div>

        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
            <DegreeTableComponent dataSource={dataSource} columns={columns} parameterAction={handleView} />
          </div>
        </div>
    </div>
  );
}

export default degreeTablePage;
