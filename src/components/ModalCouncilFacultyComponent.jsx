import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalReEnrollmentComponent = ({ visible, onClose, setDocuments }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState("Archivo no seleccionado");

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const newDocument = pdf ? { url: pdf, name: fileName } : null;
      setDocuments([newDocument].filter(Boolean));
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


  const handleFileChange = (file) => {
    setFileName(file.name);
    setPdf(URL.createObjectURL(file));
  };

  const handleDelete = () => {
    setFileName("Archivo no seleccionado");
    setPdf(null);
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
            wrapClassName="center-modal animate__animated animate__zoomIn "
          >
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold">Acta - Formato .pdf*</h4>
            </div>
            <div className="grid">
              <UploadDocumentComponent
                onChange={handleFileChange}
                pdf={pdf}
                fileName={fileName}
                onDelete={handleDelete}
                clickClassNameP=".input-field"
                clickClassName="input-field"
                label="Documento"
                detail="Descripción del documento"
                isRequired={true}
              />
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

ModalReEnrollmentComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setDocuments: PropTypes.func.isRequired,
};

export default ModalReEnrollmentComponent;
