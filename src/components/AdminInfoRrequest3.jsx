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
  const [isFirmaModalVisible, setIsFirmaModalVisible] = useState(false); // Estado para el nuevo modal
  const [initialStatusValue, setInitialStatusValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getRequestById?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          const formattedDate = new Date(result.data.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long', // Mes completo
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          const jsonData = {
            items: [
              { key: '1', label: 'Solicitante', children: `${result.data.userEntity.name} ${result.data.userEntity.lastName}` },
              { key: '2', label: 'Tipo', children: result.data.programStudent},
              { key: '3', label: 'Fecha solicitud', children: formattedDate }]
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getManageStatusByRequest?idRequest=${id}`, {
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
        
        // Verificar si algún estado contiene "Firma"
        if (statusData.some(status => status.includes('Firma'))) {
          setIsFirmaModalVisible(true);
        }
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [id]);

  const handleOk = async () => {
    if (selectedStatus !== initialStatus) {
      try {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const username = userInfo ? userInfo.sub : '';

        let putUrl = `${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id}&status=${selectedStatus}&username=${username}`;

        if (selectedStatus === 'No válido') {
          putUrl += `&msgNotApproved=${encodeURIComponent(additionalInfo)}`;
        }

        const response = await fetch(putUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          notification.success({
            message: 'Estado actualizado',
            description: `El estado se ha cambiado a ${selectedStatus}.`,
          });
          setInitialStatus(selectedStatus);
          setInitialStatusValue(selectedStatus);
          fetchStatuses();
        } else {
          notification.error({
            message: 'Error al actualizar el estado',
            description: 'No se pudo actualizar el estado. Intente de nuevo.',
          });
        }
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      } finally {
        setIsModalVisible(false);
        setIsFirmaModalVisible(false); // Cerrar el modal de Firma también
      }
    } else {
      notification.warning({
        message: 'No hay cambio de estado',
        description: `Está seleccionado el estado en el que ya viene la solicitud. Si desea cambiarlo, debe seleccionar otro estado.`,
      });
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsFirmaModalVisible(false); // Cerrar el modal de Firma también
  };

  const handleSelectChange = (value) => {
    setSelectedStatus(value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Descriptions Section */}
      <Descriptions
        title={
          <div className="flex flex-wrap items-center justify-between">
            <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
              <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" /> Información General
            </span>
          </div>
        }
        layout="vertical"
        column={{
          xl: 2,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
      >
        {data.map((item) => (
          <Descriptions.Item
            key={item.key}
            label={
              <div
                className="ml-4 text-sm md:text-base break-words w-full"
                title={item.label}
              >
                {item.label}
              </div>
            }
          >
            <span className="ml-4 text-sm md:text-base font-bold">
              {item.children}
            </span>
          </Descriptions.Item>
        ))}

        {/* Status Selection Section */}
        <Descriptions.Item className="ml-4 w-full md:w-1/3">
          <div className="bg-[#97B749] rounded-lg w-full h-9 -mt-6 custom-btn shadow-md ml-4 ">
            <select
              className="w-full h-14 mr-4 -mt-3 text-xs md:text-sm lg:text-base text-white rounded-lg font-bold flex justify-between items-center bg-transparent border-none outline-none text-center "
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              {statuses.map((status) => (
                <option className="text-black" key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </Descriptions.Item>
        
        {/* Confirm Button Section */}
        {selectedStatus === 'No aprobado' ? (
          <Descriptions.Item className="ml-4 w-full md:w-2/3">
            <div className="flex flex-col items-start justify-between w-full">
              <div className="flex flex-col w-full">
                <h4 className="text-sm font-bold ml-5 mb-2">Razón de invalidez:</h4>
                <textarea
                  className="p-4 w-full h-24 mr-6 text-xs md:text-sm rounded-lg shadow-md resize-none overflow-auto border-2 border-[#43737E]"
                  placeholder="Ingrese la razón de invalidez"
                  value={additionalInfo}
                  onChange={handleAdditionalInfoChange}
                  rows={4}
                />
              </div>
              <Button
                type="primary"
                className="custom-btn mt-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
                onClick={() => setIsModalVisible(true)}
              >
                Confirmar <FaCheck className="ml-2" />
              </Button>
            </div>
          </Descriptions.Item>
        ) : (
          <Descriptions.Item className="ml-4 w-full md:w-1/3">
            <Button
              type="primary"
              className="custom-btn -mt-6 ml-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
              onClick={() => setIsModalVisible(true)}
            >
              Confirmar <FaCheck className="ml-2 md:ml-4" />
            </Button>
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Existing Modal */}
      <Modal
        title="Confirmación de Cambio de Estado"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>¿Está seguro de que desea cambiar el estado de {initialStatusValue} a {selectedStatus}?</p>
      </Modal>

      {/* New Modal for 'Firma' */}
      <Modal
        title="Acción Requerida: Firma"
        visible={isFirmaModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmar Firma"
        cancelText="Cancelar"
      >
        <p>El estado actual requiere una firma. ¿Desea proceder con la firma?</p>
      </Modal>
    </>
  );
};

export default ComponentInfoSR;
