import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';

const ComponentInfoSR = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3030/api/user/getInformationForCouncil?idRequest=60`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        const { data: userInfo } = result;

        if (userInfo.length > 0) {
          const info = userInfo[0];
          const jsonData = {
            items: [
              { key: '1', label: 'Solicitante', children: `${info.name} ${info.last_name}` },
              { key: '2', label: 'Jornada', children: info.study_time },
              { key: '3', label: 'Fecha Ingreso', children: new Date(info.admission_date).toLocaleDateString() },
              { key: '4', label: 'Cant. perdida calidad estudiantil', children: info.count_lose_quality_study },
              { key: '5', label: 'Tipo de documento', children: info.document_type },
              { key: '6', label: 'Número de documento', children: info.document_number },
              { key: '7', label: 'Semestre', children: info.period },
              { key: '8', label: 'Carrera', children: info.description },
              { key: '9', label: 'Prom. Ult. Semestre', children: info.average_last_period },
              { key: '10', label: 'Prom. acumulado', children: info.average_accumulate },
            ],
          };
          setData(jsonData.items);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3030/api/request/getManageStatusByRequest?idRequest=62`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        const { data: statusData } = result.data;
        setStatuses(statusData);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    fetchData();
    fetchStatuses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Descriptions
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl lg:text-3xl font-bold flex items-center">
            <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" /> Información General
          </span>
        </div>
      }
      layout="vertical"
      column={Math.min(data.length, 3)}
    >
      {data.map(item => (
        <Descriptions.Item
          key={item.key}
          label={
            <div
              className="ml-10 text-base md:text-lg lg:text-xl overflow-hidden w-full"
              style={{
                wordBreak: 'break-word',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={item.label}
            >
              {item.label}
            </div>
          }
        >
          <span className="ml-10 text-base md:text-lg lg:text-xl font-bold">
            {item.children}
          </span>
        </Descriptions.Item>
      ))}
      <Descriptions.Item className="ml-10">
        <Button type="primary" className="mr-4 w-full h-14 text-white rounded-lg shadow-md color-button font-bold text-lg items-center text-center">
          Ver Documentos
        </Button>
      </Descriptions.Item>

      <Descriptions.Item className="ml-10">
        <div className="bg-[#97B749] p-2 rounded-lg w-full h-full">
          <select
            className="w-full h-10 text-white rounded-lg font-bold text-lg flex justify-between items-center bg-transparent border-none outline-none text-center"
            defaultValue="Iniciado"
          >
            {statuses.map(status => (
              <option className='text-black' key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ComponentInfoSR;
