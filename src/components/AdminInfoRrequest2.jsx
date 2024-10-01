import { useEffect, useState } from 'react';
import { Descriptions, Input } from 'antd';
import InputComponent from "./InputComponent";
import './AdminInfoRrequest.css';

const { TextArea } = Input;
const ComponentInfoSR = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);


  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');
  const tipo = params.get('tipo');

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/get?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        if(response.status==200){
          const data = result.data.infoSubjects.map(subjets => ({label: subjets.subject_name, info:subjets.detail}))
          setStatuses(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    if (tipo=='Incapacidades Estudiantes' || tipo=='Adición de créditos' || tipo=='Retiro de créditos' || tipo=='Supletorios') {
      fetchStatuses();
    }
    
  }, []);
  

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
      <div className="grid grid-flow-col gap-4">
        <div className="grid grid-flow-row ">
          <h4 className="text-md font-bold text-[#9ca3af]">Asignatura</h4>
          <div className="flex justify-center items-center flex-col w-full">
            {statuses.map((subject) => (
              <div key={subject.id} className="flex justify-center items-center w-full mb-4">
                <div className="w-3/4 p-1">
                  <InputComponent
                    id="prueba"
                    name="subjects"
                    type="readOnly"
                    placeholder="Asignatura"
                    variant="form-input"
                    value={subject.label}
                  />
                  </div>
                <div className="w-11/12">
                  <TextArea
                    id="prueba"
                    showCount
                    maxLength={200}
                    style={{ height: 80, resize: "none" }}
                    value={subject.info}
                    disabled={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default ComponentInfoSR;
