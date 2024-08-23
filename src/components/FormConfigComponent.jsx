import { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { DatePicker, notification, Button } from "antd";
import ModalConfigList from './ModalConfigListCouncill.jsx';
import ModalConfigListCommittee from '../components/ModalConfigListCommittee.jsx';
import { getInfoToken } from '../utils/utils';
import { IoAlertCircleSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import './FormConfigComponent.css';

const FormConfigComponent = ({ type }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [processType, setProcessType] = useState("");
  const [triggerPost, setTriggerPost] = useState(false);
  const [savedDates, setSavedDates] = useState([]);
  const [buttonStates, setButtonStates] = useState({
    committee: { icon: null, color: 'bg-[#97B749]' },
    faculty: { icon: null, color: 'bg-[#97B749]' },
  });

  const cambio1 = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const cambio2 = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleSave = (type, buttonKey) => {
    if (savedDates.some(item => item.date === selectedDate && item.type === type)) {
      notification.info({
        message: 'Importante',
        description: 'Esa fecha ya existe, no la puedes agregar dos veces.',
        placement: 'bottomRight',
        icon: <IoAlertCircleSharp className="font-color w-8 h-8" />,
      });
    } else {
      setProcessType(type);
      setTriggerPost({ key: buttonKey, state: true });
    }
  };

  useEffect(() => {
    if (triggerPost.state && selectedDate) {
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
            setButtonStates(prevState => ({
              ...prevState,
              [triggerPost.key]: { icon: <FaCircleCheck />, color: 'bg-[#97B749]' }
            }));
          } else {
            console.error("Error al enviar los datos:", response.statusText);
            setButtonStates(prevState => ({
              ...prevState,
              [triggerPost.key]: { icon: <BiSolidError />, color: 'bg-[#43737E]' }
            }));
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          setButtonStates(prevState => ({
            ...prevState,
            [triggerPost.key]: { icon: <BiSolidError />, color: 'bg-[#43737E]' }
          }));
        } finally {
          setTriggerPost({ key: triggerPost.key, state: false });

          setTimeout(() => {
            setButtonStates(prevState => ({
              ...prevState,
              [triggerPost.key]: { icon: null, color: 'bg-[#97B749]' }
            }));
          }, 1000);
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
            Comité de Procesos
          </h2>
        </div>
        <div id="date_comite" className="flex flex-col md:flex-row w-full items-end">
          <div className="w-full md:w-1/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <Button 
              onClick={() => handleSave("Comité de Procesos", "committee")} 
              className={`custom-button ${buttonStates.committee.color} text-white mx-2 flex items-center`}
            >
              {buttonStates.committee.icon ? buttonStates.committee.icon : "Agregar"}
            </Button>
          </div>
          <div>
            <ModalConfigListCommittee className="w-8 h-8 " />
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
          <div className="w-full md:w-1/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <Button 
              onClick={() => handleSave("Consejo de Facultad", "faculty")} 
              className={`custom-button ${buttonStates.faculty.color} text-white mx-2 flex items-center`}
            >
              {buttonStates.faculty.icon ? buttonStates.faculty.icon : "Agregar"}
            </Button>
          </div>
          <div>
            <ModalConfigList className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
            Legalización de Matricula
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
            Adición de Creditos
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
            Cancelación de creditos
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
            Postulación a Grados
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
    </div>
  );
};

export default FormConfigComponent;
