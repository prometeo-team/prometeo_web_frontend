import { useEffect, useState } from 'react';
import { Descriptions, Button, Modal, notification } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import './AdminInfoRrequest.css';

const ComponentInfoSR = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [initialStatus, setInitialStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialStatusValue, setInitialStatusValue] = useState('');


  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');
  const tipo = params.get('tipo');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/getInformationForCouncil?idRequest=${id}`, {
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


    fetchData();

  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/getManageStatusByRequest?idRequest=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      const { data: statusData } = result.data;
      setStatuses(statusData);
      if (statusData.length > 0) {
        const initial = statusData[0];
        setInitialStatus(initial);
        setInitialStatusValue(initial);
        setSelectedStatus(initial);
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [id]);


  

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Descriptions
        title={
          <div className="flex flex-wrap items-center justify-between">
            <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
               Detalle
            </span>
          </div>
        }
        layout="horizontal"
        
      >
        
      </Descriptions>

    </>
  );
};

export default ComponentInfoSR;
