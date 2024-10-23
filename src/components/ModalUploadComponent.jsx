import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { MdCloudUpload } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const ModalUploadComponent = ({ visible, onClose, setDocuments }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState("Archivo no seleccionado");
  const [originalFile, setOriginalFile] = useState(null); // Guardar el archivo original
  const [inputKey, setInputKey] = useState(Date.now()); // Para forzar la recreación del input

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const newDocument = pdf ? { url: pdf, name: fileName, originalFile: originalFile } : null;
       
      setDocuments([newDocument].filter(Boolean)); // Guardar el archivo original
      onClose();
      setConfirmLoading(false);
    }, 1000);
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
      setPdf(URL.createObjectURL(file));
      setOriginalFile(file); // Guardar el archivo original
    }
  };

  const handleDelete = () => {
    setFileName("Archivo no seleccionado");
    setPdf(null);
    setOriginalFile(null); // Reiniciar el archivo original
    setInputKey(Date.now()); 
  };

  const truncateFileName = (name) => {
    const maxLength = 20;
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <>
      {visible && (
        <div className="modal-backdrop">
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
              <h4 className="text-lg font-bold">Carta reintegro - Formato .pdf*</h4>
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
                    key={inputKey} // Para forzar la recreación del input
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
            <div className="text-center mt-2">
              {pdf ? (
                <Button key="submit" onClick={handleOk} className="text-white mx-auto custom-btn">
                  Cargar documento
                </Button>
              ) : (
                <Button disabled className="text-white mx-auto custom-btn">
                  Cargar documento
                </Button>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

ModalUploadComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setDocuments: PropTypes.func.isRequired,
};

export default ModalUploadComponent;
