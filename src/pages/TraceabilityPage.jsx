import  { useState, useEffect, useRef  } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import  TitleComponent from "../components/TitleComponent";
import TraceabilityTableComponent  from "../components/TraceabilityTableComponent";
import UserCArdComponent from '../components/UserCardComponet';

const user = sessionStorage.getItem('user');
var career;

function degreeTablePage() {
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [careerList, setcareerList] = useState(['Procesos','Configuracion']);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [columns, setColumns] = useState([{
    title: "Id Solicitud",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Accion previa",
    dataIndex: "ACPRV",
    key: "ACPRV",
  },
  {
    title: "Accion Nueva",
    dataIndex: "ACN",
    key: "ACN",
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
  },]);
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();
  
 useEffect(() => {
      obtenerDatos(); 
  }, []);
  

  const obtenerDatos = async (caso) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/getAdminRecord?${caso}userAdmin`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (response.ok && result.data) {
        const extractedData = result.data.flat().map(student => ({
          id: student.id_request,
          user: student.user_admin || 'Desconocido',
          ACPRV: student.action_before,
          ACN: student.action_after,
          date: student.action_date
        }));
        setFilas(extractedData);
      } else {
        console.error("Error en la respuesta:", result.message || "Datos no disponibles");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  

  

  const handleCarreras =  (e) => {
    if(e == 'Configuracion'){
      setColumns([{
        title: "Id Solicitud",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Usuario",
        dataIndex: "user",
        key: "user",
      },
      {
        title: "Parametro Nuevo",
        dataIndex: "ACN",
        key: "ACN",
      },
      {
        title: "Fecha",
        dataIndex: "date",
        key: "date",
      },])
      obtenerDatos('id_requestDetail=0&');
    }else if(e == 'Procesos'){
      setColumns([{
        title: "Id Solicitud",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Usuario",
        dataIndex: "user",
        key: "user",
      },
      {
        title: "Accion previa",
        dataIndex: "ACPRV",
        key: "ACPRV",
      },
      {
        title: "Accion Nueva",
        dataIndex: "ACN",
        key: "ACN",
      },
      {
        title: "Fecha",
        dataIndex: "date",
        key: "date",
      },])
      obtenerDatos();
    }
    
  };

  

  return (
    <div className='w-full flex mr-30 max-md:mr-0 h-screen scroll-container flex-col'>
        <div className='w-full mt-0 float-right h-20'>
          <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
        </div>
        <div className='w-full mt-6'>
          <TitleComponent title={"Trazabilidad"} />
        </div>

        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
            <TraceabilityTableComponent dataSource={filas} columns={columns} careers={careerList} selectedDocuments={selectedDocuments} select={handleCarreras} />
          </div>
        </div>
       
    </div>
  );
}

export default degreeTablePage;
