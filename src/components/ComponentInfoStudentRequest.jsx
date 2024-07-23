import { Descriptions,Steps  } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import './ComponentChat.css';
import './ComponentInfoStudentRequest.css';
const status = [
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  },
  {
    title: 'Inicio'
  }
]
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

/*const ComponentInfoSR = () => (
  <Descriptions
    title={
      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
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
);*/

function ComponentInfoSR(){
  return(
    <>
      <div className="flex  justify-between p-4">
          <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
            <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" />
            Información General
          </span>
        </div>
      <div className='flex flex-col max-md:flex-row items-center w-full'>
        
        <br />
        <br />
        <Steps current={0} labelPlacement="horizontal" items={status} />
        <br />
        <br />
        <div className='flex flex-row w-full justify-center max-md:flex-col max-md:text-sm'>
          {jsonData.items.map(item => (
            <div className='p-4'>
              <strong>{item.label}</strong>
              <p className='text-wrap break-words'>{item.children}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ComponentInfoSR;
