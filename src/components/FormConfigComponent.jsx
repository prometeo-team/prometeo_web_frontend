import { useState, useEffect } from 'react';
import { DatePicker, Button, notification } from 'antd';
import dayjs from 'dayjs';
import { IoAlertCircleSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import ModalConfigList from './ModalConfigListCouncill.jsx';
import ModalConfigListCommittee from '../components/ModalConfigListCommittee.jsx';
import { getInfoToken } from '../utils/utils';
import './FormConfigComponent.css';

const FormConfigComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [processType, setProcessType] = useState("");
  const [triggerPost, setTriggerPost] = useState(false);
  const [savedDates, setSavedDates] = useState([]);
  const [requestTypes, setRequestTypes] = useState([]);
  const [buttonStates, setButtonStates] = useState({});

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

  const cambio1 = (date, dateString) => {
    setSelectedDate(dateString);
  };

  useEffect(() => {
    const fetchRequestTypes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/requestType/getAllRequestTypes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setRequestTypes(result.data);
      } catch (error) {
        console.error("Error al obtener los tipos de solicitudes:", error);
      }
    };

    fetchRequestTypes();
  }, []);

  const handleDateChange = (id, dateType, date) => {
    setRequestTypes(prevTypes =>
      prevTypes.map(type =>
        type.id === id
          ? { ...type, [dateType]: date }
          : type
      )
    );
  };

  const handleUpdate = async (nameType, id) => {
    const userInfo = getInfoToken();
    const token = sessionStorage.getItem('token');
    const selectedType = requestTypes.find(type => type.id === id);

    if (!selectedType) return;

    const initDate = dayjs(selectedType.initDate).format('YYYY-MM-DD');
    const dueDate = dayjs(selectedType.dueDate).format('YYYY-MM-DD');

    const url = `${import.meta.env.VITE_API_URL}/requestType/updateRequestType`;

    const bodyData = {
      nameType: nameType,
      initDate: initDate,
      dueDate: dueDate,
      userAdmin: userInfo.sub,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        setButtonStates(prevStates => ({
          ...prevStates,
          [id]: { color: 'bg-[#97B749]', icon: <FaCircleCheck /> },
        }));

        notification.success({
          message: 'Actualización exitosa',
          description: `Las fechas de ${nameType} han sido actualizadas correctamente.`,
        });

        setTimeout(() => {
          setButtonStates(prevStates => ({
            ...prevStates,
            [id]: { color: 'bg-[#97B749]', icon: null },
          }));
        }, 1000);

      } else {
        console.error("Error al enviar los datos:", response.statusText);
        setButtonStates(prevStates => ({
          ...prevStates,
          [id]: { color: 'bg-[#43737E]', icon: <BiSolidError /> },
        }));
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setButtonStates(prevStates => ({
        ...prevStates,
        [id]: { color: 'bg-[#43737E]', icon: <BiSolidError /> },
      }));
    }
  };



  useEffect(() => {
    if (triggerPost.state && selectedDate) {
      const userInfo = getInfoToken();

      const saveDateProcess = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/processDate/saveDateProcess?process_type=${processType}&date=${selectedDate}&userAdmin=${userInfo.sub}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
             
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
            Comité de gestión procesos
          </h2>
        </div>
        <div id="date_comite" className="flex flex-col md:flex-row w-full items-end">
          <div className="w-full md:w-1/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker
              onChange={cambio1}
            />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <Button
              onClick={() => handleSave("Comité de Procesos", "committee")}
              className={`custom-button ${buttonStates.committee?.color || 'bg-[#97B749]'} text-white ml-2 flex items-center`}
            >
              {buttonStates.committee?.icon || "Agregar"}
            </Button>
          </div>
          <div className='mt-2 ml-2'>
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
            Consejo de facultad
          </h2>
        </div>
        <div id="date_consejo" className="flex flex-col md:flex-row w-full items-end">
          <div className="w-full md:w-1/3 flex flex-col mb-3 md:mb-0">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha</h4>
            <DatePicker
              onChange={cambio1}
            />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <Button
              onClick={() => handleSave("Consejo de Facultad", "faculty")}
              className={`custom-button ${buttonStates.faculty?.color || 'bg-[#97B749]'} text-white ml-2 flex items-center`}
            >
              {buttonStates.faculty?.icon || "Agregar"}
            </Button>
          </div>
          <div className='mt-2 ml-2'>
            <ModalConfigList className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div>
        <div className="w-full border-t border-black"></div>
      </div>
      <div>
        {requestTypes.map((requestType) => (
          <div key={requestType.id}>
            <div className="activity_box ml-2 mb-6">
              <div className="grid grid-flow-col">
                <h2 className="text-xl font-bold text-black mt-5 mb-5 break-words whitespace-normal">
                  {requestType.nameType}
                </h2>
              </div>
              <div id={`date_${requestType.nameType}`} className="flex flex-col sm:flex-row w-full items-end">
                <div className="flex flex-col sm:flex-row w-full sm:w-2/3">
                  <div className="flex flex-col items-start mr-6 mb-4 sm:mb-0 w-full sm:w-1/2">
                    <h4 className="text-md font-bold text-[#9ca3af]">Fecha inicio</h4>
                    <DatePicker
                      onChange={(date) => handleDateChange(requestType.id, 'initDate', date)}
                      defaultValue={dayjs(requestType.initDate)}
                      className="mt-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col items-start w-full sm:w-1/2">
                    <h4 className="text-md font-bold text-[#9ca3af]">Fecha fin</h4>
                    <DatePicker
                      onChange={(date) => handleDateChange(requestType.id, 'dueDate', date)}
                      defaultValue={dayjs(requestType.dueDate)}
                      className="mt-2 w-full"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleUpdate(requestType.nameType, requestType.id)}
                  className={`custom-button ${buttonStates[requestType.id]?.color || 'bg-[#97B749]'} text-white mx-2 flex items-center`}
                >
                  {buttonStates[requestType.id]?.icon || "Actualizar"}
                </Button>
              </div>
            </div>
            <div>
              <div className="w-full border-t border-black"></div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="w-full border-t border-black"></div>
      </div>
    </div>
  );
};

export default FormConfigComponent;
