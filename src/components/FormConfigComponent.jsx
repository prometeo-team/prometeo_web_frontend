import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { DatePicker, notification } from "antd";
import ModalComponent from "./ModalComponent";
import { FiSave } from "react-icons/fi";
import ModalConfigList from '../components/ModalConfigList.jsx';
import { getInfoToken } from '../utils/utils';
import { IoAlertCircleSharp } from "react-icons/io5";

const FormConfigComponent = ({ type }) => {
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [processType, setProcessType] = useState("");
  const [triggerPost, setTriggerPost] = useState(false);
  const [savedDates, setSavedDates] = useState([]);

  const cambio1 = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const cambio2 = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleOpenModalCheck = () => {
    setModalVisibleCheck(true);
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
  };

  const handleSave = (type) => {
    if (savedDates.some(item => item.date === selectedDate && item.type === type)) {
      notification.info({
        message: 'Importante',
        description: 'Esa fecha ya existe, no la puedes agregar dos veces.',
        placement: 'bottomRight',
        icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
      });
    } else {
      setProcessType(type);
      setTriggerPost(true);
    }
  };

  useEffect(() => {
    if (triggerPost && selectedDate) {
      const userInfo = getInfoToken();

      const saveDateProcess = async () => {
        try {
          const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/processDate/saveDateProcess?process_type=${processType}&date=${selectedDate}&userAdmin=${userInfo.sub}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            console.log("Datos enviados exitosamente");
            setSavedDates([...savedDates, { date: selectedDate, type: processType }]);
          } else {
            console.error("Error al enviar los datos:", response.statusText);
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        } finally {
          setTriggerPost(false);
        }
      };

      saveDateProcess();
    }
  }, [triggerPost, selectedDate, processType, savedDates]);

  return (
    <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Comite de Procesos
          </h2>
        </div>
        <div id="date_comite" className="flex flex-col md:flex-row w-full items-end">
          <div className="w-full md:w-2/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <button onClick={() => handleSave("Comité de Procesos")}>
              <CiSquarePlus className="w-8 h-8 text-[#374151]" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black"></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Consejo académico
          </h2>
        </div>
        <div id="date_consejo" className="flex flex-col md:flex-row w-full items-end">
          <div className="w-full md:w-2/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <button onClick={() => handleSave("Consejo de Facultad")}>
              <CiSquarePlus className="w-8 h-8 text-[#374151]" />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Legalizacion de Matricula
          </h2>
        </div>
        <div id="date_legalizacion" className="flex flex-col sm:flex-row w-full items-end">
          <div className="flex flex-col sm:flex-row w-full sm:w-2/3">
            <div className="flex flex-col items-start mr-6 mb-4 sm:mb-0 w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha inicio</h4>
              <DatePicker onChange={cambio1} className="mt-2 w-full" />
            </div>
            <div className="flex flex-col items-start w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha fin</h4>
              <DatePicker onChange={cambio2} className="mt-2 w-full" />
            </div>
          </div>
          <button>
            <CiSquarePlus className="w-8 h-8 text-[#374151]" />
          </button>
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Adicion de Creditos
          </h2>
        </div>
        <div id="date_legalizacion" className="flex flex-col sm:flex-row w-full items-end">
          <div className="flex flex-col sm:flex-row w-full sm:w-2/3">
            <div className="flex flex-col items-start mr-6 mb-4 sm:mb-0 w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha inicio</h4>
              <DatePicker onChange={cambio1} className="mt-2 w-full" />
            </div>
            <div className="flex flex-col items-start w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha fin</h4>
              <DatePicker onChange={cambio2} className="mt-2 w-full" />
            </div>
          </div>
          <button>
            <CiSquarePlus className="w-8 h-8 text-[#374151]" />
          </button>
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Cancelacion de creditos
          </h2>
        </div>
        <div id="date_legalizacion" className="flex flex-col sm:flex-row w-full items-end">
          <div className="flex flex-col sm:flex-row w-full sm:w-2/3">
            <div className="flex flex-col items-start mr-6 mb-4 sm:mb-0 w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha inicio</h4>
              <DatePicker onChange={cambio1} className="mt-2 w-full" />
            </div>
            <div className="flex flex-col items-start w-full sm:w-1/2">
              <h4 className="text-md font-bold text-[#9ca3af]">Fecha fin</h4>
              <DatePicker onChange={cambio2} className="mt-2 w-full" />
            </div>
          </div>
          <button>
            <CiSquarePlus className="w-8 h-8 text-[#374151]" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ModalConfigList
          visible={modalVisibleCheck}
          onClose={handleCloseModalCheck}
          content="Solicitud realizada correctamente"
          icon={<IoMdCheckmarkCircle />}
          className="modal-config-list" // Añade una clase si necesitas estilos adicionales
        />
      </div>
    </div>
  );
};

export default FormConfigComponent;
