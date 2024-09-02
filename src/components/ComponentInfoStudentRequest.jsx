import { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';
import './ComponentInfoStudentRequest.css';

function ComponentInfoSR() {
  const [requestData, setRequestData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3030/api/request/getRequestById?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result && result.data) {
          setRequestData(result.data);
          console.log(result.data.requestTypeEntity.id);
        } else {
          console.error("Error: Datos de la solicitud no encontrados.");
        }

      } catch (error) {
        console.error("Error al obtener la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [id]);


  useEffect(() => {
    if (requestData) {
      const fetchStatusData = async () => {
        try {
          const response = await fetch(`http://localhost:3030/api/requestDetail/getStatusRecord?id_requestDetail=${id}&id_road=${requestData.requestTypeEntity.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          const result = await response.json();
          setStatusData(result.data);
        } catch (error) {
          console.error("Error al obtener los datos del estado:", error);
        }
      };

      fetchStatusData();
    }
  }, [id, requestData]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!requestData || !statusData) {
    return <div>No se encontró la información de la solicitud o los estados.</div>;
  }

  // Crear los pasos con el orden adecuado
  const stepsData = Object.keys(statusData).filter(key => key !== "No Aprobado" && key !== "Finalizado");

  // Insertar "No Aprobado" si está en true
  if (statusData["No Aprobado"]) {
    stepsData.push("No Aprobado");
  }

  // Insertar "Finalizado" siempre
  stepsData.push("Finalizado");

  // Generar los datos de los pasos para el componente Steps
  const steps = stepsData.map(key => ({
    title: key,
    status: statusData[key] ? 'finish' : 'wait',
  }));

  // Dividir los pasos en dos grupos: los primeros 4 y el resto
  const firstRowSteps = steps.slice(0, 4);
  const secondRowSteps = steps.slice(4);

  const jsonData = {
    items: [
      {
        key: '1',
        label: 'Solicitante',
        children: `${requestData.userEntity.name} ${requestData.userEntity.lastName}`,
      },
      {
        key: '2',
        label: 'Fecha de creación',
        children: new Date(requestData.createdAt).toLocaleDateString(),
      },
      {
        key: '3',
        label: 'Programa',
        children: requestData.programStudent,
      },
      {
        key: '4',
        label: 'Fecha de expiración',
        children: new Date(requestData.requestTypeEntity.dueDate).toLocaleDateString(),
      },
      {
        key: '5',
        label: 'Tipo de solicitud',
        children: requestData.requestTypeEntity.nameType,
      },
    ],
  };

  return (
    <>
      <div className="flex w-full justify-between p-4">
        <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
          <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" />
          Información General
        </span>
      </div>
      <div className='flex flex-col items-center w-full md:flex-col'>
        <br />
        <br />
        {/* Renderizar los primeros 4 steps */}
        <Steps
          labelPlacement="horizontal"
          direction="horizontal" // Horizontal por defecto
          className="md:direction-vertical lg:direction-horizontal" // Vertical en pantallas medianas, horizontal en grandes
          items={firstRowSteps}
        />
        {/* Si hay más de 4 steps, renderizar el resto en una nueva fila */}
        {secondRowSteps.length > 0 && (
          <>
            <br />
            <br />
            <Steps
              labelPlacement="horizontal"
              direction="horizontal" // Horizontal por defecto
              className="md:direction-vertical lg:direction-horizontal" // Vertical en pantallas medianas, horizontal en grandes
              items={secondRowSteps}
            />
          </>
        )}
        <br />
        <br />
        {/* Información del estudiante en la parte inferior para md o menos */}
        <div className='flex flex-col w-full justify-center md:flex-row md:flex-wrap lg:flex-nowrap md:text-sm'>
          {jsonData.items.map(item => (
            <div className='p-4 md:w-1/2 lg:w-auto' key={item.key}>
              <strong>{item.label}</strong>
              <p className='text-wrap break-words'>{item.children}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  
}

export default ComponentInfoSR;
