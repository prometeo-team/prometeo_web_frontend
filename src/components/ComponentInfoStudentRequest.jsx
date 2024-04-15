import { Descriptions } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

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
      <span className="text-lg md:text-xl lg:text-3xl font-bold">
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Información General
      </span>
    }
    layout="vertical" 
    column={5} //limite
  >
    {jsonData.items.map(item => (
      <Descriptions.Item key={item.key} label={<span className="text-base md:text-lg lg:text-xl">{item.label}</span>}>
        <span className="text-base md:text-lg lg:text-xl">{item.children}</span>
      </Descriptions.Item>
    ))}
  </Descriptions>
);

export default ComponentInfoSR;
