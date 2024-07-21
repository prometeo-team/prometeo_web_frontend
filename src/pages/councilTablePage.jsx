import { TitleComponent, TableComponent } from "../components/";
import { Tag } from "antd";
import "./studentRequestPage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UserCardComponent from '../components/UserCardComponet';

function councilTablePage() {
  const columns = [
    {
      title: "Solicitud",
      dataIndex: "id_solicitud",
      key: "id_solicitud",
    },
    {
      title: "Fecha de Creacion",
      dataIndex: "fecha",
      key: "fecha",
      sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha),
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
        let color;
        if (estado === "Consejo") {
          color = "cyan"; 
        } else {
          estado === "Finalizado";
          color = "red";
        }
        return <Tag color={color}>{estado.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Tipo de Solicitud",
      dataIndex: "tipo_solicitud",
      key: "tipo_solicitud",
    },
  ];

  const handleView = (e, record) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para ver el registro
    console.log("Ver registro:", record.id_solicitud);
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
      id_solicitud: "C231231",
      fecha: "2023-03-15",
      programa: "Bioingeniería",
      estado: "Finalizado",
      tipo_solicitud: "Reintegro",
    },
    {
      id_solicitud: "C231231",
      fecha: "2023-04-17",
      programa: "Bioingeniería",
      estado: "Consejo",
      tipo_solicitud: "Reintegro",
    },
    {
      id_solicitud: "C231231",
      fecha: "2023-03-16",
      programa: "Bioingeniería",
      estado: "Iniciado",
      tipo_solicitud: "Reintegro",
    },
    {
      id_solicitud: "C231231",
      fecha: "2023-03-16",
      programa: "Bioingeniería",
      estado: "Iniciado",
      tipo_solicitud: "Reintegro",
    },
    {
      id_solicitud: "C231231",
      fecha: "2023-03-16",
      programa: "Bioingeniería",
      estado: "Iniciado",
      tipo_solicitud: "Reintegro",
    },
    {
      id_solicitud: "C231231",
      fecha: "2023-03-16",
      programa: "Bioingeniería",
      estado: "Iniciado",
      tipo_solicitud: "Reintegro",
    },
  ];

  const filteredConsejoRows = dataSource.filter(
    (item) => item.estado === "Consejo"
  );

  // Filtrar las filas con estados diferentes a "Consejo"
  const filteredOtherRows = dataSource.filter(
    (item) => item.estado !== "Consejo"
  );

  const combinedDataSource = [...filteredConsejoRows, ...filteredOtherRows];

  return (
    <div className="mr-4 ml-4 mt-4">
      <UserCardComponent  number={2} />
      <div>
        <TitleComponent title={"Solicitudes"} />
      </div>

      <div className="m-5">
        <TableComponent
          dataSource={combinedDataSource}
          columns={columns}
          parameterAction={handleView}
        />
      </div>
      <div className="ml-5 mb-5">
        <Button
          to="/homePage"
          type="primary"
          className="color-button text-sm md:text-base lg:text-lg h-auto"
          icon={<ArrowLeftOutlined />}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}

export default councilTablePage;
