import { useEffect, useState } from 'react';
import { Descriptions, Button, Modal, notification } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import './ComponentLegalizationAdmin.css';

const ComponentLegalizationAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [initialStatus, setInitialStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialStatusValue, setInitialStatusValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getLegalizationStudentByIdRequest?idRequest=${id}`, {
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
              { key: '2', label: 'Teléfono', children: info.phone },
              { key: '3', label: 'Financiación de Matrícula', children: info.tuition_financing },
              { key: '4', label: 'Jornada de Estudio', children: info.study_time },
              { key: '5', label: 'Dirección', children: info.address },
              { key: '6', label: 'Localidad', children: info.location },
              { key: '7', label: 'Número de Documento', children: info.document_number },
              { key: '8', label: 'Nombre del Acudiente', children: info.attendant_name },
              { key: '9', label: 'Teléfono del Acudiente', children: info.attendant_phone },
              { key: '10', label: 'Tipo de Documento', children: info.document_type },
              { key: '11', label: 'Programa del Estudiante', children: info.program_student },
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
  }, [id]);

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

        if (selectedStatus === 'No valida') {
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
      <Descriptions
        title={
          <div className="flex flex-wrap items-center justify-between mr-8">
            <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
              <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" /> Información General
            </span>
          </div>
        }
        layout="vertical"
        column={{
          xl: 3,
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

        <Descriptions.Item className="ml-4 w-full md:w-1/3">
          <div className="bg-[#97B749] rounded-lg w-full h-9 -mt-6 custom-btn shadow-md ml-4">
            <select
              className="w-full h-14 mr-4 -mt-3 text-xs md:text-sm lg:text-base text-white rounded-lg font-bold flex justify-between items-center bg-transparent border-none outline-none text-center "
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e.target.value)}
              disabled={statuses.length === 0} // Desactivar si está vacío
            >
              {statuses.length === 0 ? (
                <option value="">Finalizó</option>
              ) : (
                statuses.map((status) => (
                  <option className="text-black" key={status} value={status}>
                    {status}
                  </option>
                ))
              )}
            </select>
          </div>
        </Descriptions.Item>
        {selectedStatus === 'No valida' ? (
          <Descriptions.Item className="ml-4 w-full md:w-2/3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
              <div className="flex flex-col w-full md:w-3/5">
                <h4 className="text-sm font-bold ml-5 -pb-4">Razón de invalidez:</h4>
                <textarea
                  className="p-4 custom-textarea w-full h-24 ml-3 mr-6 text-xs md:text-sm rounded-lg shadow-md resize-none overflow-auto border-[#43737E]"
                  placeholder="Ingrese la razón de invalidez"
                  value={additionalInfo}
                  onChange={handleAdditionalInfoChange}
                  rows={4}
                />
              </div>
              <Button
                type="primary"
                className="custom-btn mt-4 md:mt-0 ml-0 md:ml-4 w-full md:w-auto h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
                onClick={() => setIsModalVisible(true)}
              >
                Confirmar <FaCheck className="ml-2 md:ml-4" />
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
    </>
  );
};

export default ComponentLegalizationAdmin;