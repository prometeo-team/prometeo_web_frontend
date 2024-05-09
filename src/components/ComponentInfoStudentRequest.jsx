import { Descriptions } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';

const jsonData = {
  items: [
    {
      key: '1',
      label: 'Solicitante',
      children: 'Pepito Perez',
    },
    {
      key: '2',
      label: 'Fecha de creación',
      children: '12-04-2024',
    },
    {
      key: '3',
      label: 'Semestre',
      children: 'Octavo',
    },
    {
      key: '4',
      label: 'Fecha de expiración',
      children: '12-05-2024',
    },
    {
      key: '5',
      label: 'Tipo de solicitud',
      children: 'Reintegro',
    },
  ],
};

const ComponentInfoSR = () => (
  <Descriptions
    title={
      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl lg:text-3xl font-bold flex items-center">
          <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" />
          Información General
        </span>
      </div>
    }
    layout="vertical"
    column={5} //limite
  >
    {jsonData.items.map(item => (
      <Descriptions.Item key={item.key} label={<span className="ml-10 text-base md:text-lg lg:text-xl">{item.label}</span>}>
        <span className="ml-10 text-base md:text-lg lg:text-xl font-bold">{item.children}</span>
      </Descriptions.Item>
    ))}
  </Descriptions>
);

export default ComponentInfoSR;
