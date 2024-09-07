import  { useState, useEffect, useRef  } from 'react';
import  TitleComponent from "../components/TitleComponent";
import DegreeTableComponent  from "../components/DegreeTableComponent";
import UserCArdComponent from '../components/UserCardComponet';

const user = sessionStorage.getItem('user');
var career;

function degreeTablePage() {
  
  const [careerList, setcareerList] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [filas, setFilas] = useState([]);
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
      title: "Número Telefonico",
      dataIndex: "phone",
      key: "phone",
    },
  ];

    
  useEffect(() => {
    const obtenerCarrerasYDatos = async () => {
      const primeraCarrera = await obtenerCarreras(); // Asegúrate de esperar los datos
      if (primeraCarrera) {
        career = primeraCarrera;
        obtenerDatos(); // Ahora obtener los datos con la carrera
      }
    };
    obtenerCarrerasYDatos(); // Llamar a la función asíncrona
  }, []);

  const handleSelectDocument = (username, checked) => {
    console.log(username);
    console.log(checked);
    setSelectedDocuments(prev =>
      checked
        ? [...prev, username] // Añadir si está marcado
        : prev.filter(us => us !== username) // Eliminar si está desmarcado
    );
    console.log(selectedDocuments);
  };
  

  const obtenerDatos = async (caso) => {
    if (!career) {
      console.error("No hay carrera seleccionada.");
      return;
    }
  
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/student/getAllStudents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      
      const result = await response.json();
      if (response.status === 200) {
        const extractedData = result.data.map(student => ({
          Id: student.userEntity.username,
          documentNumber: student.documentNumber,
          name: student.userEntity.name,
          lastName: student.userEntity.lastName,
          phone: student.phone
        }));
        setFilas(extractedData);
        setSelectedDocuments(extractedData.map(student => student.Id));
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } 
  };

  const obtenerCarreras = async () => {
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/Admincareer?username=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        const carrerasSimuladas = result.data.career;
        console.log(carrerasSimuladas)
        setcareerList(carrerasSimuladas);
        career = careerList[0];
        // Retornar el primer elemento solo si careerList tiene elementos
        if (carrerasSimuladas.length > 0) {
          return carrerasSimuladas[0];
        } else {
          return null;
        }
      }else {
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
  }
  const handelConvocatoria =  () => {
    console.log(selectedDocuments);
    
  }

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
            <DegreeTableComponent dataSource={filas} columns={columns} careers={careerList} degree={handelConvocatoria} parameterAction={handleSelectDocument} selectedDocuments={selectedDocuments} select={handleCarreras} />
          </div>
        </div>
    </div>
  );
}

export default degreeTablePage;
