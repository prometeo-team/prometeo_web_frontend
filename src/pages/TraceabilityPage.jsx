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
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();
  const columns = [
   
    {
      title: "Documento",
      dataIndex: "documentNumber",
      key: "documentNumber",
    },
    {
      title: "Usuario",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellidos",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Número Telefónico",
      dataIndex: "phone",
      key: "phone",
    },
  ];

 /*useEffect(() => {
    const obtenerCarrerasYDatos = async () => {
      const primeraCarrera = await obtenerCarreras(); // Asegúrate de esperar los datos
      if (primeraCarrera) {
        career = primeraCarrera;
        obtenerDatos(); // Ahora obtener los datos con la carrera
      }
    };
    obtenerCarrerasYDatos(); // Llamar a la función asíncrona
  }, []);*/

  const handleSelectDocument = (username, checked) => {
    console.log(username);
    console.log(checked);
    setSelectedDocuments(prev =>
      checked
        ? [...prev, username] // Añadir si está marcado
        : prev.filter(us => us !== username) // Eliminar si está desmarcado
    );
  };
  

  const obtenerDatos = async () => {
    if (!career) {
      console.error("No hay carrera seleccionada.");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student/listDegreeApplicationStudents?careerName=${career}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      
      const result = await response.json();
      if (result.status === 200) {
        if(result.data=null){
          console.log(result.data)
        }else{
        const extractedData = result.data.map(student => ({
          Id: student.userEntity.username,
          documentNumber: student.documentNumber,
          name: student.userEntity.name,
          lastName: student.userEntity.lastName,
          phone: student.phone
        }));
        setFilas(extractedData);
        setSelectedDocuments(extractedData.map(student => student.Id));
      }
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } 
  };

  

  const handleCarreras =  (e) => {
    console.log(e);
    career=e;
    obtenerDatos();
  };

  const handelConvocatoria = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json"); 

    const subjectList = selectedDocuments.map(credit => ({
      username: credit
    }));
    const raw = JSON.stringify(subjectList);
    //console.log(subjectList);
     
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      console.log(requestOptions)


    try {
    const response = await  fetch(`${import.meta.env.VITE_API_URL}/request/degreeApplication?programName=${career}`, requestOptions)
    const result = await response.json();
        if (response.status === 200) {
          setModalVisibleCheck(true);
        } else {
          console.error("Error en la respuesta:", result.message || response.statusText);
        }
    } catch (error) {
        console.error("Error al obtener los programas:", error);
    }
    
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
    navigate("/admin/dashboard");
  };

  return (
    <div className='w-full flex mr-24 max-md:mr-0 h-screen scroll-container flex-col'>
        <div className='w-full mt-0 float-right h-20'>
          <UserCArdComponent user={'Secretaria academica'} number={2}></UserCArdComponent>
        </div>
        <div className='w-full mt-6'>
          <TitleComponent title={"Trazabilidad"} />
        </div>

        <div className='w-full mt-16'>
          <div className='ml-8 max-md:ml-3 mb-20 w-11/12'>
            <TraceabilityTableComponent dataSource={filas} columns={columns} careers={careerList} degree={handelConvocatoria} parameterAction={handleSelectDocument} selectedDocuments={selectedDocuments} select={handleCarreras} />
          </div>
        </div>
       
    </div>
  );
}

export default degreeTablePage;