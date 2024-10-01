import { useEffect, useState } from 'react';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';
import './ComponentInfoStudentRequest.css';

function ComponentInfoSR({setbutton}) {
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getRequestById?id=${id}`, {
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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/getStatusRecord?id_requestDetail=${id}&id_road=${requestData.requestTypeEntity.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          const result = await response.json();
          setStatusData(result.data);
          setbutton(result.data);
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

  const stepsData = Object.keys(statusData).filter(key =>
    key !== "No aprobado" &&
    key !== "Finalizado" &&
    key !== "No válido" &&  // Evitar que se elimine en el filtro inicial
    (key !== "Pendiente firma 100%" || statusData["Pendiente firma 100%"] === true) &&
    (key !== "Pendiente firma 85%" || statusData["Pendiente firma 85%"] === true) &&
    (key !== "Pendiente firma 50%" || statusData["Pendiente firma 50%"] === true)
  );

  if (statusData["No aprobado"]) {
    stepsData.push("No aprobado");
  }

  if (statusData["No válido"]) {
    stepsData.push("No válido");
  }

  stepsData.push("Finalizado");

  const steps = stepsData.map((key) => ({
    title: key,
    status: statusData[key] ? 'finish' : 'wait',
    description: statusData[key] ? 'Completo' : 'En espera',
  }));

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
      <div className="flex flex-col w-full">
        <div className="w-full p-4 overflow-x-auto">
          <div className="custom-steps flex">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center mr-8">
                <div
                  className={`step-indicator ${index < steps.findIndex(s => s.status === 'finish') ? 'bg-[#43737E]' : (step.status === 'finish' ? 'bg-[#97B749]' : 'bg-gray-400')} rounded-full w-8 h-8 flex items-center justify-center text-white`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className={`step-title ${step.status === 'finish' ? 'text-[#97B749]' : 'text-gray-600'} font-bold`}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
