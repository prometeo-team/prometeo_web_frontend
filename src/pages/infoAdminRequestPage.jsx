import { useState, useEffect, useRef } from 'react';
import { Table, Space, Input, Select, Pagination, Button, Tag, Spin } from "antd";
import UserCArdComponent from '../components/UserCardComponet';
import NavbarTypeComponent from '../components/NavbarTypeComponent';
import TableComponent from '../components/TableComponent2';
import CardGraficsComponent from '../components/CardGraficsComponent';
import { FaEye } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { TitleComponent } from "../components";
import Loader from '../components/LoaderComponent.jsx';
import '../App.css';

const user = sessionStorage.getItem('user');
var career;

const { Search } = Input;

const InfoAdminRequestPage = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);
  const [Pendiente, setPendiente] = useState([]);
  const [proceso, setProceso] = useState([]);
  const [careerList, setcareerList] = useState([]);
  const [Fin, setFin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selecteType, setSelecteType] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [page, setPage] = useState(1);

  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);

  useEffect(() => {
    obtenerCarreras(); // Llamar a la función asíncrona
  }, []);

  useEffect(() => {
    if (careerList.length > 0) {
      setSelectedCareer(careerList[0].label); // Asegúrate de que sea el formato correcto para el Select
    }
  }, [careerList]);

  useEffect(() => {
    if (careerList.length > 0 && selectedCareer) {
      obtenerDatos(page, searchQuery, selecteType, selectedCareer);
    }

  }, [page, searchQuery, selecteType, selectedCareer]);

  useEffect(() => {
    if (careerList.length > 0 && selectedCareer) {
      fetchGrafics(selecteType, selectedCareer);
    }

  }, [selecteType, selectedCareer]);

  const fetchGrafics = async (filter = "", career2 = "") => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/requestMonthlyStatistics?requestType=${filter}&programName=${career2}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.status === "200 OK") {
        setPendiente(result.data.pendingRequests);
        setProceso(result.data.inProcessRequests);
        setFin(result.data.finishedRequests);
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const obtenerDatos = async (currentPage = 1, query = "", caso = "", career2 = "") => {
    setIsTableLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getAllRequest?page=${currentPage}&carrer=${career2}&nameType=${caso}&searchQuery=${query}`, {
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
        console.log(result.data.content);
        const extractedData = result.data.content.map(item => ({
          id_solicitud: item.requestEntity.idRequest,
          name: `${item.requestEntity.userEntity.name} ${item.requestEntity.userEntity.lastName}`,
          createdAt: item.requestEntity.createdAt,
          status: item.requestDetailEntity.status.name,
          tipo_solicitud: item.requestEntity.requestTypeEntity.nameType,
        }));
        console.log(extractedData);
        setFilas(extractedData);
        setTotalItems(result.data.totalElements);
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
    finally {
      setIsTableLoading(false);
    }
  };

  const obtenerCarreras = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/Admincareer?username=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        const carrerasSimuladas = result.data.career;
        const items = carrerasSimuladas.map(item => ({ value: item, label: item }));
        console.log(carrerasSimuladas)
        setcareerList(items);
        setcareerList([...items, { value: 'Docentes', label: 'Docentes' }]);
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleClickType = (option) => {
    // Destruir los gráficos actuales
    if (chart1Ref.current) chart1Ref.current.destroy();
    if (chart2Ref.current) chart2Ref.current.destroy();
    if (chart3Ref.current) chart3Ref.current.destroy();

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

    setSelecteType(option === 'all' ? "" : option);
    setPage(1);

  };

  const handleCarreras = (e) => {
    console.log(e);
    career = e;
    // Destruir los gráficos actuales
    if (chart1Ref.current) chart1Ref.current.destroy();
    if (chart2Ref.current) chart2Ref.current.destroy();
    if (chart3Ref.current) chart3Ref.current.destroy();
    setSelectedCareer(career);
    setPage(1);
  }

  const handelChangePage = (e) => {
    setPage(e);
  };

  const handleSearch = (value) => {
    setSearchQuery(value); // Actualizamos el estado de búsqueda
    setPage(1); // Reseteamos a la primera página cuando se hace una búsqueda
  };

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
      title: 'Fecha de Creación',
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
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <FaEye
          style={{ cursor: "pointer", color: "#97B749", fontSize: "20px" }}
          onClick={() => record.tipo_solicitud === "Legalización de matrícula" ?
            navigate(`/admin/legalizacion-solicitud?id=${record.id_solicitud}`)
            :
            navigate(`/admin/solicitud?id=${record.id_solicitud}&tipo=${record.tipo_solicitud}`)
          }
        />
      ),
    }
  ];


  return (
    <div className='w-full flex max-md:mr-0 h-screen scroll-container flex-col'>
      <div className='w-full mt-0 float-right h-20'>
        <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
      </div>
      <div>
        <TitleComponent title={"Gestión de solicitudes"} />
      </div>

      <div className='w-full mt-6'>
        <NavbarTypeComponent onClick={handleClickType} />
      </div>
      <div className='w-full mt-16'>
        <div className='ml-8 max-md:ml-2 w-11/12 flex flex-row max-md:flex-col max-md:items-center'>
          <CardGraficsComponent type="1" number={Pendiente.reduce((acc, item) => acc + parseFloat(item.count), 0)} grafico="grafico1" data={Pendiente} chartRef={chart1Ref} />
          <CardGraficsComponent type="2" number={proceso.reduce((acc, item) => acc + parseFloat(item.count), 0)} grafico="grafico2" data={proceso} chartRef={chart2Ref} />
          <CardGraficsComponent type="3" number={Fin.reduce((acc, item) => acc + parseFloat(item.count), 0)} grafico="grafico3" data={Fin} chartRef={chart3Ref} />
        </div>
      </div>
      <div className='w-full mt-16'>
        <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
          {isLoading ? (
            <div className="loader-container">
              <Loader className="h-12 w-12" />
            </div>
          ) : (
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
              <Select
                className="h-11 ml-2"
                value={selectedCareer}
                style={{ width: 250 }}
                onChange={(value) => {
                  setSelectedCareer(value);
                  handleCarreras(value);
                }}
                options={careerList}
                placeholder="Selecciona una carrera"
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
                  onChange={(page) => handelChangePage(page)} // Actualiza la página actual
                  showSizeChanger={false} // Deshabilitamos el cambio de tamaño de página
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoAdminRequestPage;
