import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { RiCloseFill } from 'react-icons/ri';
import { getInfoToken } from '../utils/utils';

const ModalList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [comiteDates, setComiteDates] = useState([]);
  const [consejoDates, setConsejoDates] = useState([]);
  const userInfo = getInfoToken();

  useEffect(() => {

    console.log('userInfo:', userInfo);

    const fetchDates = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3030/api/processDate/getAllProcessDates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response Data:', result);
        const data = result.data;

        const comiteMatch = data.match(/Comité de Procesos, Dates: ([^}]*)/);
        const consejoMatch = data.match(/Consejo de Facultad, Dates: ([^}]*)/);

        if (comiteMatch) {
          const comiteDatesArray = comiteMatch[1].split(',');
          setComiteDates(comiteDatesArray);
        }

        if (consejoMatch) {
          const consejoDatesArray = consejoMatch[1].split(',');
          setConsejoDates(consejoDatesArray);
        }
      } catch (error) {
        console.error("Error al obtener las fechas:", error);
      }
    };

    fetchDates();
  }, []);

  const showModal = () => {
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
      const response = await fetch(`http://127.0.0.1:3030/api/processDate/deleteProcessDate?process_type=${encodeURIComponent(processType)}&date=${date}&userAdmin=${userInfo.sub}`, {
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
      if (processType === 'Comité de Procesos') {
        setComiteDates(prevDates => prevDates.filter(d => d !== date));
      } else if (processType === 'Consejo de Facultad') {
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
        className="color-button text-sm md:text-base lg:text-2xl h-auto mt-4 rounded-[10px] px-[20px] py-[10px] hover:bg-black"
        type="primary"
        onClick={showModal}
      >
        Lista de fechas
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
                  <th className="px-4 py-2 text-xl font-bold text-black">Fechas de Comité</th>
                  <th className="px-4 py-2 text-xl font-bold text-black">Fechas de Consejo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="block md:table-row">
                  <td className="w-full md:w-auto px-4 py-2 align-top">
                    <span className="block md:hidden font-bold text-xl text-black">Fechas de Comité</span>
                    <ul className="list-disc list-inside">
                      {comiteDates.map((date, index) => (
                        <li key={index} className="flex items-center justify-center">
                          {date}
                          <Button
                            type="text"
                            icon={<RiCloseFill className="w-7 h-7 text-[#43737E]" />}
                            className="ml-2"
                            onClick={() => deleteDate('Comité de Procesos', date)}
                          />
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-full md:w-auto px-4 py-2 align-top hidden md:table-cell">
                    <ul className="list-disc list-inside">
                      {consejoDates.map((date, index) => (
                        <li key={index} className="flex items-center justify-center">
                          {date}
                          <Button
                            type="text"
                            icon={<RiCloseFill className="w-7 h-7 text-[#43737E]" />}
                            className="mr-2"
                            onClick={() => deleteDate('Consejo de Facultad', date)}
                          />
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className="block md:table-row">
                  <td className="block md:table-cell px-4 py-2 align-top md:hidden">
                    <span className="block md:hidden font-bold text-xl text-black">Fechas de Consejo</span>
                    <ul className="list-disc list-inside">
                      {consejoDates.map((date, index) => (
                        <li key={index} className="flex items-center">
                          {date}
                          <Button
                            type="text"
                            icon={<RiCloseFill className="w-7 h-7 text-[#43737E]" />}
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

export default ModalList;
