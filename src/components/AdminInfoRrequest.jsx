import { useEffect, useState } from 'react';
import { Descriptions, Button, Modal, notification } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import './AdminInfoRrequest.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

const ComponentInfoSR = () => {
  const [role, setRole] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [initialStatus, setInitialStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFirmaModalVisible, setIsFirmaModalVisible] = useState(false);
  const [initialStatusValue, setInitialStatusValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const username = userInfo ? userInfo.sub : '';
  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');
  const tipo = params.get('tipo');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
          setRole('ROLE_ACADEMIC');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        if (decodedToken.authorities.includes('ROLE_STUDENT')) {
          setRole('ROLE_STUDENT');
        } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
          setRole('ROLE_ADMIN');
        } else if (decodedToken.authorities.includes('ROLE_TEACHER')) {
          setRole('ROLE_TEACHER');
        } else if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
          setRole('ROLE_ACADEMIC');
        } else if (decodedToken.authorities.includes('ROLE_SUBACADEMIC')) {
          setRole('ROLE_SUBACADEMIC');
        } else if (decodedToken.authorities.includes('ROLE_COORDINADORPRE')) {
          setRole('ROLE_COORDINADORPRE');
        } else if (decodedToken.authorities.includes('ROLE_COORDINADORPOS')) {
          setRole('ROLE_COORDINADORPOS');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getInformationForCouncil?idRequest=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        const { data: userInfo } = result;

        if (userInfo.length > 0) {
          const info = userInfo[0];
          const jsonData = {
            items: [
              { key: '1', label: 'Solicitante', children: `${info.name} ${info.last_name}` },
              { key: '2', label: 'Jornada', children: info.study_time },
              { key: '3', label: 'Fecha Ingreso', children: new Date(info.admission_date).toLocaleDateString() },
              { key: '4', label: 'Cant. pérdida calidad estudiantil', children: info.count_lose_quality_study },
              { key: '5', label: 'Tipo de Documento', children: info.document_type },
              { key: '6', label: 'Número de Documento', children: info.document_number },
              { key: '7', label: 'Semestre', children: info.period },
              { key: '8', label: 'Carrera', children: info.description },
              { key: '9', label: 'Prom. Ult. Semestre', children: info.average_last_period },
              { key: '10', label: 'Prom. acumulado', children: info.average_accumulate },
            ],
          };
          setData(jsonData.items);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchStatuses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/getManageStatusByRequest?idRequest=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      const { data: statusData } = result.data;
      setStatuses(statusData);
      if (statusData.length > 0) {
        const initial = statusData[0];
        setInitialStatus(initial);
        setInitialStatusValue(initial);
        setSelectedStatus(initial);
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  const sendDocument = async (s3url) => {
    const user2 = sessionStorage.getItem('user');
    const nameDoc = s3url.split("/")[4];
    console.log(nameDoc)
    try {
      const response = await fetch(s3url);
      if (!response.ok) {
        throw new Error('No se pudo descargar el archivo desde S3');
      }
      const fileBlob = await response.blob();
      console.log(fileBlob);
      const file = new File([fileBlob], nameDoc, { type: fileBlob.type });
      console.log(file);
      const formData = new FormData();

      formData.append("idRequest", id);
      formData.append("userAdmin", user2);
      formData.append('file', file);

      const uploadResponse = await fetch(`http://localhost:3030/api/request/firmDocumentMail`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('No se pudo subir el archivo');
      }

      console.log('Archivo subido exitosamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/generate?requestId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();

        if (result.status === "200" && result.data) {
          setPdfUrl(result.data);

        } else {
          console.error('No se encontró el documento.');
        }
      } catch (error) {
        console.error('Error al obtener el documento:', error);
      }
    };

    fetchDocument();
  }, [id]);

  useEffect(() => {
    fetchStatuses();
  }, [id]);



  const handleOk = async () => {
    const user2 = sessionStorage.getItem('user');
    if (selectedStatus !== initialStatus) {
      try {


        let putUrl = `${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id}&status=${selectedStatus}&username=${user2}`;

        if (selectedStatus === 'No valida') {
          putUrl += `&msgNotApproved=${encodeURIComponent(additionalInfo)}`;
        }

        if (selectedStatus === 'Pendiente' && tipo == 'Retiro de Créditos') {
          putUrl += `&msgNotApproved=${encodeURIComponent(additionalInfo)}`;
        }

        const response = await fetch(putUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          notification.success({
            message: 'Estado actualizado',
            description: `El estado se ha cambiado a ${selectedStatus}.`,
          });
          setInitialStatus(selectedStatus);
          setInitialStatusValue(selectedStatus);
          fetchStatuses();
        } else {
          notification.error({
            message: 'Error al actualizar el estado',
            description: 'No se pudo actualizar el estado. Intente de nuevo.',
          });
        }
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      } finally {
        setIsModalVisible(false);
        setIsFirmaModalVisible(false);
      }
    } else {
      notification.warning({
        message: 'No hay cambio de estado',
        description: `Está seleccionado el estado en el que ya viene la solicitud. Si desea cambiarlo, debe seleccionar otro estado.`,
      });
      setIsModalVisible(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Image,
      Table.configure({
        HTMLAttributes: {
          class: 'my-custom-table', 
        },
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '<p>Este es tu documento</p>',
    editable: isEditing,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html);
    },
  });


  const fetchHtmlContent = async () => {
    try {
      const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/request/HTML?requestId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      const result = await response.json();
      if (result.status === "200") {
        console.log(result.data);
        setHtmlContent(result.data);

        if (editor) {
          editor.commands.setContent(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  useEffect(() => {
    fetchHtmlContent();
  }, [id, editor]);

  const handleSelectChange = (value) => {
    setSelectedStatus(value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleFirmar = async () => {
    sendDocument(pdfUrl);   // Mueve esta línea después de fetchDocument
    setIsFirmaModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    const modal = Modal.confirm({
      title: 'Confirmación',
      content: '¿Está seguro de que desea cancelar?',
      okText: 'OK',
      cancelText: 'cancelar',
      onOk: () => {
        setIsFirmaModalVisible(false);
        fetchHtmlContent(); // Ahora puedes llamar a la función aquí
        setTimeout(() => {
          modal.destroy();
          onCancel(); // Llama a la función onCancel
        }, 500);
      },
      onCancel: () => {
        // Aquí puedes manejar lo que sucede al cancelar
      },
    });
  };


  useEffect(() => {
    const header = document.querySelector('.your-header-class');
    if (header) {
      header.style.border = 'none';
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
              <BsInfoCircleFill className="w-6 h-6 color-icons mr-3.5" /> Información General
            </span>
          </div>
        }
        layout="vertical"
        column={{
          xl: 2,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
      >
        {data.map((item) => (
          <Descriptions.Item
            key={item.key}
            label={
              <div
                className="ml-4 text-sm md:text-base break-words w-full"
                title={item.label}
              >
                {item.label}
              </div>
            }
          >
            <span className="ml-4 text-sm md:text-base font-bold">
              {item.children}
            </span>
          </Descriptions.Item>
        ))}

        <Descriptions.Item className="ml-4 w-full md:w-1/3">
          <div className="bg-[#97B749] rounded-lg w-full h-9 -mt-6 custom-btn shadow-md ml-4">
            <select
              className="w-full h-14 mr-4 -mt-3 text-xs md:text-sm lg:text-base text-white rounded-lg font-bold flex justify-between items-center bg-transparent border-none outline-none text-center"
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              {statuses.map((status) => (
                <option className="text-black" key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </Descriptions.Item>
        {selectedStatus === 'No Aprobado' || (selectedStatus === 'Pendiente' && tipo == 'Retiro de Créditos') ? (
          <Descriptions.Item className="ml-4 w-full md:w-2/3">
            <div className="flex flex-col items-start justify-between w-full">
              <div className="flex flex-col w-full">
                <h4 className="text-sm font-bold ml-5 mb-2">Razón de invalidez:</h4>
                <textarea
                  className="p-4 w-full h-24 mr-6 text-xs md:text-sm rounded-lg shadow-md resize-none overflow-auto border-2 border-[#43737E]"
                  placeholder="Ingrese la razón de invalidez"
                  value={additionalInfo}
                  onChange={handleAdditionalInfoChange}
                  rows={4}
                />
              </div>
              <Button
                type="primary"
                className="custom-btn mt-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
                onClick={() => setIsModalVisible(true)}
              >
                Confirmar <FaCheck className="ml-2" />
              </Button>
            </div>
          </Descriptions.Item>
        ) : (
          <Descriptions.Item className="ml-4 w-full md:w-1/3">
            <Button
              type="primary"
              className="custom-btn -mt-6 ml-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
              onClick={() => {
                if (initialStatusValue.includes('Firma')) {
                  setIsFirmaModalVisible(true);
                } else {
                  setIsModalVisible(true);
                }
              }}
              disabled={initialStatusValue.includes('Firma') && role !== 'ROLE_ACADEMIC'}
            >
              {initialStatusValue.includes('Firma') ? 'Firmar' : 'Confirmar'}
              <FaCheck className="ml-2 md:ml-4" />
            </Button>
          </Descriptions.Item>

        )}
      </Descriptions>

      <Modal
        title="Confirmación de Cambio de Estado"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>¿Está seguro de que desea cambiar el estado de {initialStatusValue} a {selectedStatus}?</p>
      </Modal>

      <Modal
        title="Firma del Documento"
        visible={isFirmaModalVisible}
        onOk={handleFirmar}
        onCancel={handleCancel2}
        footer={[
          <Button key="cancel" onClick={handleCancel2}>
            Cancelar
          </Button>,
          <Button key="edit" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Dejar de editar' : 'Editar'}
          </Button>,
          <Button key="firmar" type="primary" onClick={handleFirmar} disabled={isEditing}>
            Firmar
          </Button>,
        ]}
        width={650}
        style={{ marginTop: '-80px' }}
      >
        <div className="toolbar mb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-white'}`}
            disabled={!isEditing}
          >
            <strong>Negrilla</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-white'}`}
            disabled={!isEditing}
          >
            <em>Italic</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded ${editor.isActive('underline') ? 'bg-gray-300' : 'bg-white'}`}
            disabled={!isEditing}
          >
            <u>U</u>
          </button>
        </div>

        <div className="border border-gray-300 rounded p-2 bg-gray-50" style={{ maxHeight: '480px', overflowY: 'auto' }}>
          <EditorContent editor={editor} />
        </div>
      </Modal>

    </>
  );
};

export default ComponentInfoSR;
