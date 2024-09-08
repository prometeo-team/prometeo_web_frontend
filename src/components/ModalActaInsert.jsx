import { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { MdCloudUpload } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import InputComponent from "../components/InputComponent";
import { useNavigate } from 'react-router-dom';

const ModalActaInsert = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState("Archivo no seleccionado");
  const [documentType, setDocumentType] = useState("");
  const [inputKey, setInputKey] = useState(Date.now());
  const user = sessionStorage.getItem('user');

  const handleOk = async () => {
    if (!pdf || !documentType) {
      message.error("Debe seleccionar un archivo y proporcionar un tipo de documento.");
      return;
    }
  
    setConfirmLoading(true);
  
    const formData = new FormData();
    formData.append("file", pdf);
    formData.append("userAdmin", user);
    formData.append("documentType", documentType);
  
    try {
      const response = await fetch(
        "https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/council/saveCouncilRecord",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: formData,
        }
      );
  
      const result = await response.json();
  
      if (response.ok && result.status === "200 OK") {
        message.success("Documento cargado con éxito!");
        onClose();
        navigate('/admin/historial-consejo'); 
      } else {
        console.error("Error en la respuesta:", result.message);
        message.error("Error al cargar el documento. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al cargar el documento:", error);
      message.error("Error al cargar el documento. Intente nuevamente.");
    } finally {
      setConfirmLoading(false); // Rehabilita el botón
    }
  };

  const handleCancel = () => {
    document.querySelector(".center-modal").classList.add("animate__zoomOut");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setPdf(file);
    }
  };

  const handleDelete = () => {
    setFileName("Archivo no seleccionado");
    setPdf(null);
    setInputKey(Date.now());
  };

  const handleDocumentTypeChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setDocumentType(value);
    }
  };

  const truncateFileName = (name) => {
    const maxLength = 20;
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <>
      {visible && (
        <div className="modal-backdrop ">
          <Modal
            open={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            centered
            wrapClassName="center-modal animate__animated animate__zoomIn"
          >
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold">Inserte el acta de consejo - Formato .pdf*</h4>
            </div>
            <div className="grid">
              <div className="text-center">
                <div>
                  <p className="text-sm font-bold mb-1">Documento</p>
                  <p className="text-xs text-gray-600 mb-4">Descripción del documento</p>
                </div>
                <Form.Item
                  className="flex justify-center items-center border-dashed border-2 cursor-pointer rounded-md form-color h-20"
                  onClick={() => document.getElementById("input-file").click()}
                >
                  <Input
                    key={inputKey}
                    type="file"
                    accept=".pdf"
                    id="input-file"
                    hidden
                    onChange={handleFileChange}
                  />
                  {pdf ? (
                    <div className="flex items-center">
                      <AiFillFilePdf color="#000" size={48} />
                      <p>{truncateFileName(fileName)}</p>
                    </div>
                  ) : (
                    <MdCloudUpload color="#000" size={50} />
                  )}
                </Form.Item>
                <span className="flex items-center uploaded-row">
                  {fileName === "Archivo no seleccionado" ? (
                    "Archivo no seleccionado"
                  ) : (
                    <>
                      Eliminar archivo -{" "}
                      <MdDelete className="delete-icon" onClick={handleDelete} />
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold mt-4">Inserte el número de acta</h4>
              <InputComponent
                type="number"
                placeholder="Ingrese el tipo de documento"
                variant="form-input"
                value={documentType}
                onChange={handleDocumentTypeChange}
              />
            </div>
            <div className="text-center mt-2">
              <Button
                key="submit"
                onClick={handleOk}
                className="text-white mx-auto custom-btn"
                disabled={confirmLoading || !pdf || !documentType} // Deshabilitar mientras se carga o si faltan datos
              >
                {confirmLoading ? "Cargando..." : "Cargar documento"}
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

ModalActaInsert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalActaInsert;
