import { useEffect, useState, useRef } from 'react';
import { Descriptions, Button, Modal, notification, Space } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Spin } from "antd";
import { LoadingOutlined, BorderBottomOutlined } from '@ant-design/icons';
import './AdminInfoRrequest.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';



// Importa GlobalWorkerOptions desde pdfjs-dist
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Establece la ruta del worker
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;


const ComponentInfoSR = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [initialStatus, setInitialStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditModalVisible2, setIsEditModalVisible2] = useState(false);
  const [isFirmaModalVisible, setIsFirmaModalVisible] = useState(false);
  const [initialStatusValue, setInitialStatusValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('<h1>Este es tu documento</h1><p>El contenido con estilos aparecerá aquí.</p>');
  const [htmlContent2, setHtmlContent2] = useState('<h1>Este es tu documento</h1><p>El contenido con estilos aparecerá aquí.</p>');
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [boleanNP, setBoleanNP] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isBadRequest, setIsBadRequest] = useState(false);

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const username = userInfo ? userInfo.sub : '';
  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');
  const tipo = params.get('tipo');

  const openNotification = (title, description) => {
    notification.error({
      message: title,
      description: description,
      duration: 2, // Duración de la notificación en segundos
    });
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
      },
    },
  });

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
        } else if (decodedToken.authorities.includes('ROLE_DECANO')) {
          setRole('ROLE_DECANO');
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

      console.log(statusData[0]);

      if (statusData[0] === "Pendiente firma") {
        documentToFirm();
      }

      if (statusData[0] === "No aprobado") {
        documentToFirm();
      }

      setStatuses(statusData);

      if (statusData.length > 0) {
        const initial = statusData[0];
        setInitialStatus(initial);
        setInitialStatusValue(initial);
        setSelectedStatus(initial);
      }
      console.log('statusData:', statusData);
      setBoleanNP(statusData.length === 1 && statusData[0].trim().toLowerCase() === "no aprobado");
      console.log('Is only "No aprobado":', statusData.length === 1 && statusData[0].trim().toLowerCase() === "no aprobado");

    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };



  const sendDocument = async (html) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
    const raw = JSON.stringify({
      "htmlContent": html,
      "requestId": id,
      "userAdmin": sessionStorage.getItem('user')
    });

    try {
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/request/uploadPDF`, {
        method: 'POST',
        headers: myHeaders,
        body: raw
      });

      if (!uploadResponse.ok) {
        throw new Error('No se pudo subir el archivo');
      }

      console.log('Archivo subido exitosamente');
      setIsEditModalVisible(false);
      changeStatus('Pendiente firma');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendDocumentNAproved = async (html2) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);

    const formData = new FormData();
    formData.append("idRequest", id);
    console.log(id);
    formData.append("username", sessionStorage.getItem('user'));
    console.log(sessionStorage.getItem('user'));
    formData.append("html", html2);

    try {
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/request/updateStatusRequestNotApproved`, {
        method: 'PUT',
        headers: myHeaders,
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('No se pudo enviar el documento');
      }

      console.log('Documento enviado exitosamente');
      setIsEditModalVisible2(false);
      //changeStatus('Enviado para Aprobación');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const changeStatus = async (status) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);

    try {
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id}&status=${status}&username=${sessionStorage.getItem('user')}`, {
        method: 'PUT',
        headers: myHeaders,
      });

      if (!uploadResponse.ok) {
        throw new Error('No se pudo subir el archivo');
      }

      console.log('Estatus actualizado');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const documentToFirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/getByIdRequest?id_request=${id}&firma=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setPdfUrl(result.data[0].url);
        setPdfName(result.data[0].url.split('/')[3]);
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [id]);

  const handleOk = async () => {
    const user2 = sessionStorage.getItem('user');
    if (selectedStatus !== initialStatus || selectedStatus == "Pendiente completitud") {
      try {
        let putUrl = `${import.meta.env.VITE_API_URL}/request/updateStatusRequest?idRequest=${id}&status=${selectedStatus}&username=${user2}`;
        if (selectedStatus === 'No válido') {
          putUrl += `&msgNotApproved=${encodeURIComponent(additionalInfo)}`;
        }
        if (selectedStatus === 'Pendiente completitud') {
          putUrl += `&msgNotApproved=${encodeURIComponent(additionalInfo)}`;
        }

        if ((selectedStatus === 'Pendiente' || selectedStatus === 'No aprobado') && (tipo == 'Retiro de créditos' || tipo == 'Adición de créditos' || tipo == 'Incapacidades Estudiantes' || tipo == 'Supletorios' || tipo == 'Legalización de matrícula' || tipo == 'Incapacidades Docentes')) {
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
          if (selectedStatus === 'Pendiente' && tipo == 'Retiro de créditos') {
            notification.success({
              message: 'Estado actualizado',
              description: `Correo enviado.`,
            });
          }
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

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/HTML?requestId=${id}&userAdmin=${sessionStorage.getItem('user')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.status === "200") {
        setHtmlContent(result.data);
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  const fetchHtml2Content = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request/HTML?requestId=${id}&userAdmin=${sessionStorage.getItem('user')}&flag=${true}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.status === "200") {
        setHtmlContent2(result.data);
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  const firmDocument = async () => {
    setIsLoading(true); // Activa el loading
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const file = new File([blob], pdfName, { type: 'application/pdf' });
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
      const formdata = new FormData();
      formdata.append("idRequest", id);
      formdata.append("userAdmin", sessionStorage.getItem('user'));
      formdata.append("file", file);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response2 = await fetch(`${import.meta.env.VITE_API_URL}/request/firmDocumentMail`, requestOptions);
      const result = await response2.json();

      if (response2.ok) {
        if (result.status === "401") {
          openNotification('Documento ya firmado', 'El documento ya ha sido firmado anteriormente.');
          setIsLoading(false); // Detiene el loading
          return; // Salir de la función para no continuar
        } else if (result.status === "200") {
          fetchStatuses();
          setIsLoading(false);
          // Cerrar el modal
          setIsFirmaModalVisible(false);
          // Cambiar estado según condiciones
          if ((tipo === "Reserva de cupo" && selectedStatus === 'No aprobado') ||
            (tipo === "Reembolso" && selectedStatus === 'No aprobado') ||
            (tipo === "Activación de cupo" && selectedStatus === 'No aprobado') ||
            (tipo === "Reintegro" && selectedStatus === 'No aprobado')) {
            changeStatus('No aprobado');
          }
        }
      } else {
        console.error("Error en la respuesta:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los programas:", error);
    } finally {
      setIsLoading(false); // Asegúrate de que el loading se detenga en cualquier caso
    }
  };

  const handleSelectChange = (value) => {
    setSelectedStatus(value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setLoading(true);
    setIsEditing(false);
    const content = contentRef.current.innerHTML;
    const sanitizedHtmlContent = sanitizeHtml(content);
    console.log(sanitizedHtmlContent);
    setHtmlContent(content);
    sendDocument(sanitizedHtmlContent);

  };

  const handleSave2 = () => {
    setLoading(true);
    setIsEditing(false);
    const content2 = contentRef.current.innerHTML;
    const sanitizedHtmlContent2 = sanitizeHtml(content2);
    console.log(sanitizedHtmlContent2);
    setHtmlContent2(content2);
    sendDocumentNAproved(sanitizedHtmlContent2);
  };

  const sanitizeHtml = (html) => {
    // Crear un documento DOM a partir del HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Serializar de nuevo a HTML con etiquetas correctamente cerradas
    return new XMLSerializer().serializeToString(doc);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsEditModalVisible2(false);
    setIsEditModalVisible(false);
    setIsFirmaModalVisible(false)
  };
  const handleCancel3 = () => {
    setIsEditModalVisible2(false);
  };

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

        {(selectedStatus === 'No aprobado' &&
          (tipo === 'Reintegro' || tipo === 'Reembolso' || tipo === 'Activación de cupo' || tipo === 'Reserva de cupo')) ? (
          <Descriptions.Item className="ml-4 w-full md:w-2/3">
            <div className="flex flex-col items-start pr-5">
              <Button
                type="primary"
                className="custom-btn -mt-6 ml-4 w-full h-9 text-xs md:text-sm text-white rounded-lg shadow-md color-button font-bold flex items-center justify-center"
                onClick={() => {
                  console.log(boleanNP)
                  if (boleanNP) {

                    setIsEditModalVisible2(false);
                    setIsFirmaModalVisible(true);
                  } else if (selectedStatus === 'No aprobado') {
                    fetchHtml2Content();
                    setIsEditModalVisible2(true);
                  } else {
                    setIsModalVisible(true);
                  }
                }}
                disabled={initialStatusValue.includes('Firma') && role !== 'ROLE_ACADEMIC'}
              >
                {initialStatusValue.includes('No aprobado') ? 'Firmar' : 'Confirmar'}
                <FaCheck className="ml-2 md:ml-4" />
              </Button>
            </div>
          </Descriptions.Item>
        ) : (selectedStatus === 'No aprobado' || (selectedStatus === 'Pendiente' && tipo == 'Retiro de créditos') || selectedStatus === 'Pendiente completitud') ? (
          <Descriptions.Item className="ml-4 w-full md:w-2/3">
            <div className="flex flex-col items-start justify-between w-full">
              <div className="flex flex-col w-full">
                <h4 className="text-sm font-bold ml-5 mb-2">Razón de no aprobación:</h4>
                <textarea
                  className="p-4 w-full h-24 mr-6 text-xs md:text-sm rounded-lg shadow-md resize-none overflow-auto border-2 border-[#43737E]"
                  placeholder="Ingrese la razón de no aprobación"
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
                if (selectedStatus == 'En elaboración') {
                  fetchHtmlContent();
                  setIsEditModalVisible(true);
                } else if (initialStatusValue.includes('firma')) {
                  setIsFirmaModalVisible(true);
                } else {
                  setIsModalVisible(true);
                }
              }}
              disabled={initialStatusValue.includes('firma') && role !== 'ROLE_ACADEMIC'}
            >
              {initialStatusValue.includes('firma') ? 'Firmar' : 'Confirmar'}
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
        title="Elaboración de carta"
        visible={isEditModalVisible}
        onOk={handleSave}
        onCancel={handleCancel2}
        width={800}
        className='-mt-16'
        footer={[
          !loading && (
            <Button key="cancel" onClick={handleCancel2}>
              Cancelar
            </Button>
          ),
          !loading && (
            <Button key="edit" onClick={toggleEdit}>
              {isEditing ? 'Dejar de editar' : 'Editar'}
            </Button>
          ),
          !loading && (
            <Button key="save" type="primary" onClick={handleSave}>
              Guardar
            </Button>
          ),
          loading && (
            <div className="loader-container">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          )
        ]}
      >
        <div
          contentEditable={isEditing}
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            border: isEditing ? '1px solid gray' : 'none',
            padding: '10px',
            height: '600px',
            overflowY: 'auto',
          }}
        />
      </Modal>

      <Modal
        title="Creación de carta"
        visible={isEditModalVisible2}
        onOk={handleSave}
        onCancel={handleCancel3}
        width={800}
        className='-mt-16'
        footer={[
          !loading && (
            <Button key="cancel" onClick={handleCancel3}>
              Cancelar
            </Button>
          ),
          !loading && (
            <Button key="edit" onClick={toggleEdit}>
              {isEditing ? 'Dejar de editar' : 'Editar'}
            </Button>
          ),
          !loading && (
            <Button key="save" type="primary" onClick={handleSave2}>
              Guardar
            </Button>
          ),
          loading && (
            <div className="loader-container">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          )
        ]}
      >
        <div
          contentEditable={isEditing}
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: htmlContent2 }}
          style={{
            border: isEditing ? '1px solid gray' : 'none',
            padding: '10px',
            height: '600px',
            overflowY: 'auto',
          }}
        />
      </Modal>

      <Modal
        title="Firma del Documento"
        visible={isFirmaModalVisible}
        onCancel={handleCancel2}
        className='w-14 -mt-16'
        width={1000}
        footer={[
          !isLoading && (
            <Button key="cancel" onClick={handleCancel2}>
              Cancelar
            </Button>
          ),
          !isLoading && (
            <Button
              key="firmar"
              type="primary"
              onClick={firmDocument} // Solo llama a firmDocument
            >
              Firmar
            </Button>
          ),
          isLoading && (
            <div className="loader-container">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          ),
        ]}
      >
        <p>Por favor, revise el documento antes de firmarlo.</p>
        {pdfUrl ? (
          <div style={{ height: '700px', overflow: 'auto' }}>
            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
          </div>
        ) : (
          <p>No se encontró el documento.</p>
        )}
      </Modal>
    </>
  );
};

export default ComponentInfoSR;
