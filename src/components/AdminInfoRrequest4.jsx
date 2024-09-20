import { useEffect, useState } from 'react';
import { Descriptions, Button, Modal, notification } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { LuUpload } from "react-icons/lu";
import ModalDegreeEnglshComponent from './ModalDegreeEnglshComponent';
import ModalDegreeFinanzasComponent from './ModalDegreeFinanzasComponent';
import ModalDegreeLibraryComponent from './ModalDegreeLibraryComponent';
import './AdminInfoRrequest.css';

const ComponentInfoSR = () => {
  const [data, setData] = useState([]);
  const [ingles, setIngles] = useState(true);
  const [biblioteca, setBiblioteca] = useState(true);
  const [finanzas, setFinanzas] = useState(true);
  const [documentsIngles, setDocumentsIngles] = useState([]);
  const [documentsBiblioteca, setDocumentsBiblioteca] = useState([]);
  const [documentsFinanzas, setDocumentsFinanzas] = useState([]);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isFirmaModalVisible, setIsFirmaModalVisible] = useState(false); // Estado para el nuevo modal
  const [initialStatusValue, setInitialStatusValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleCloseModal1 = () => {
    setIsModalVisible1(false);
    setBiblioteca(false);
  };
  const handleCloseModal2 = () => {
    setIsModalVisible2(false);
    setIngles(false);
  };
  const handleCloseModal3= () => {
    setIsModalVisible3(false);
    setFinanzas(false);
  };

  const fetchInfo = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/getDegreeValidationByIdRequest?id_request=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        const result = await response.json();
        if (response.ok) {
          console.log(result.data)
          if(result.data.Biblioteca==true){
            setBiblioteca(false);
          }

          if(result.data.Finanzas==true){
            setFinanzas(false);
          }

          if(result.data.Inglés==true){
            setIngles(false);
          }
        } else {
            console.error("Error en la respuesta:", result.message);
        }
    } catch (error) {
        console.error("Error al obtener los programas:", error);
    }
  };

  const fetchSave = async (document) => {
    console.log(document[0].originalfile);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
    const formdata = new FormData();
    
    

    formdata.append("id_request", id);

    
    formdata.append("files", document[0].originalfile);
    
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };


  try {
  const response = await  fetch(`${import.meta.env.VITE_API_URL}/documents/addDocumentsToRequest`, requestOptions)
  const result = await response.json();
      if (result.status === "200 OK") {
        //setModalVisibleCheck(true);
        console.log('guardado');
      } else {
        console.error("Error en la respuesta:", result.message);
      }
  } catch (error) {
      console.error("Error al obtener los programas:", error);
  }
};

  return (
    <>
      {/* Descriptions Section */}
      <Descriptions
        title={
          <div className="flex flex-wrap items-center justify-between">
            <span className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
               Adjuntar Archivos
            </span>
          </div>
        }
      >
        <div className='text-white'>
          {ingles &&(
          <Button
            type="primary"
            className="custom-btn mt-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
            onClick={() => setIsModalVisible2(true)}
          >
            Certificado de ingles <LuUpload className="ml-2 h-7 w-7" />
          </Button>
          )}
          {biblioteca &&(
          <Button
            type="primary"
            className="custom-btn mt-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
            onClick={() => setIsModalVisible1(true)}
          >
            Paz y salvo Biblioteca <LuUpload className="ml-2 h-7 w-7" />
          </Button>
          )}
          {finanzas &&(
          <Button
            type="primary"
            className="custom-btn mt-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
            onClick={() => setIsModalVisible3(true)}
          >
            Paz y salvo Finanzas <LuUpload className="ml-2 h-7 w-7" />
          </Button>
          )}
        </div>
       
      </Descriptions>
      <ModalDegreeLibraryComponent
          visible={isModalVisible1}
          onClose={handleCloseModal1}
          setDocuments={fetchSave}
      />
      <ModalDegreeEnglshComponent
          visible={isModalVisible2}
          onClose={handleCloseModal2}
          setDocuments={fetchSave}
      />
      <ModalDegreeFinanzasComponent
          visible={isModalVisible3}
          onClose={handleCloseModal3}
          setDocuments={fetchSave}
      />
    </>
  );
};

export default ComponentInfoSR;
