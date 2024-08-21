import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { getInfoToken } from '../utils/utils';

const ModalList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [comiteDates, setComiteDates] = useState([]);
  const [consejoDates, setConsejoDates] = useState([]);

  useEffect(() => {
    const userInfo = getInfoToken();
    console.log('userInfo:', userInfo);

    const fetchDates = async () => {
      try {
        const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/processDate/getAllProcessDates`, {
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

  const fetchDates = async () => {
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/processDate/getAllProcessDates`, {
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

  useEffect(() => {
    fetchDates();
  }, []);

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
                    <ul className="list-disc list-inside ml-4">
                      {comiteDates.map((date, index) => (
                        <li key={index} className="py-1">
                          {date}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-full md:w-auto px-4 py-2 align-top hidden md:table-cell">
                    <ul className="list-disc list-inside ml-4">
                      {consejoDates.map((date, index) => (
                        <li key={index} className="py-1">
                          {date}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className="block md:table-row">
                  <td className="block md:hidden px-4 py-2 align-top">
                    <span className="block font-bold text-xl text-black">Fechas de Consejo</span>
                    <ul className="list-disc list-inside ml-4">
                      {consejoDates.map((date, index) => (
                        <li key={index} className="py-1">
                          {date}
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
