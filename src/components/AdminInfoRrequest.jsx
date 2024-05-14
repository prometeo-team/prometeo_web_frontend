import { Descriptions, Button, Select } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';

const { Option } = Select;

const jsonData = {
  items: [
    { key: '1', label: 'Solicitante', children: 'Pepito Perez' },
    { key: '2', label: 'Jornada', children: 'Diurna' },
    { key: '3', label: 'Fecha Ingreso', children: '12-04-2024' },
    { key: '4', label: 'Cant. perdida calidad estudiantil', children: '0' },
    { key: '5', label: 'Tipo de documento', children: 'Cédula de ciudadania' },
    { key: '6', label: 'Número de documento', children: '12345678' },
    { key: '7', label: 'Semestre', children: 'Octavo' },
    { key: '8', label: 'Carrera', children: 'Bioingeniería' },
    { key: '9', label: 'Prom. Ult. Semestre', children: '3.9' },
    { key: '10', label: 'Prom. acumulado', children: '4.0' },
  ]
};

const ComponentInfoSR = () => {

  return (
    <Descriptions
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl lg:text-3xl font-bold flex items-center">
            <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" /> Información General
          </span>
        </div>
      }
      layout="vertical"
      column={Math.min(jsonData.items.length, 3)}
    >
      {jsonData.items.map(item => (
        <Descriptions.Item
          key={item.key}
          label={
            <div
              className="ml-10 text-base md:text-lg lg:text-xl overflow-hidden w-full"
              style={{
                wordBreak: 'break-word',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={item.label}
            >
              {item.label}
            </div>
          }
        >
          <span className="ml-10 text-base md:text-lg lg:text-xl font-bold">
            {item.children}
          </span>
        </Descriptions.Item>
      ))}
      <Descriptions.Item className="ml-10 ">
        <Button type="primary" className="mr-4 w-full h-14 text-white rounded-lg shadow-md color-button font-bold text-lg  items-center text-center">Ver Documentos</Button>
      </Descriptions.Item>


      <Descriptions.Item className="ml-10">
        <div className="bg-[#97B749] p-2 rounded-lg w-full h-full">
          <select
            className="w-full h-10 text-white rounded-lg font-bold text-lg flex justify-between items-center bg-transparent border-none outline-none text-center"
            defaultValue="Iniciado"
          >
            <option className='text-black' value="Aprobado">Aprobado</option>
            <option className='text-black' value="Denegado">Denegado</option>
          </select>
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ComponentInfoSR;
