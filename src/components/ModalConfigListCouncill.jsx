import { useState } from 'react';
import { Modal, Button } from 'antd';
import { RiCloseFill } from 'react-icons/ri';
import { getInfoToken } from '../utils/utils';
import './FormConfigComponent.css';

const ModalConfigListCouncill = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [consejoDates, setConsejoDates] = useState([]);
  const userInfo = getInfoToken();

  const fetchDates = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/processDate/getAllProcessDates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response Data:', result);
      const data = result.data;

      const consejoMatch = data.match(/Consejo de Facultad, Dates: ([^}]*)/);

      if (consejoMatch) {
        const consejoDatesArray = consejoMatch[1]
          .split(',')
          .map(date => new Date(date.trim()))  // Convertir cada fecha en un objeto Date
          .sort((a, b) => a - b);  // Ordenar las fechas de la más antigua a la más lejana

        setConsejoDates(consejoDatesArray.map(date => date.toISOString().split('T')[0])); // Convertir de nuevo a formato de cadena si es necesario
      }
    } catch (error) {
      console.error("Error al obtener las fechas:", error);
    }
  };

  const showModal = async () => {
    await fetchDates();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteDate = async (processType, date) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/processDate/deleteProcessDate?process_type=${encodeURIComponent(processType)}&date=${date}&userAdmin=${userInfo.sub}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar la fecha: ${response.status}`);
      }

      // Actualizar las fechas en la interfaz después de la eliminación
      if (processType === 'Consejo de Facultad') {
        setConsejoDates(prevDates => prevDates.filter(d => d !== date));
      }

      console.log(`Fecha ${date} eliminada con éxito del ${processType}`);
    } catch (error) {
      console.error("Error al eliminar la fecha:", error);
    }
  };

  return (
    <div>
      <Button
        className="custom-button bg-[#97B749] text-white"
        type="primary"
        onClick={showModal}
      >
        Lista de fechas Consejo
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
        wrapClassName="center-modal animate__animated animate__zoomIn"
      >
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="px-4 py-2 text-xl font-bold text-black">Fechas de Consejo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="block md:table-row">
                  <td className="w-full md:w-auto px-4 py-2 align-top">
                    <span className="block md:hidden font-bold text-xl text-black">Fechas de Consejo</span>
                    <ul className="list-disc list-inside">
                      {consejoDates.map((date, index) => (
                        <li key={index} className="flex items-center justify-center">
                          <span className="text-2xl mr-2">•</span>{date}
                          <Button
                            type="text"
                            icon={<RiCloseFill className="w-7 h-7 text-[#43737E]" />}
                            className="ml-2"
                            onClick={() => deleteDate('Consejo de Facultad', date)}
                          />
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalConfigListCouncill;
