import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { AiFillFilePdf } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./ModalLegalizationComponent.css";

const ModalLegalizationComponent = ({ visible, onClose, setDocuments, title, detail }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [doc6, setDoc6] = useState({ pdf: null, fileName: "Archivo no seleccionado", originalfile: null });
  const [hasAcceptedAgreement, setHasAcceptedAgreement] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const documentsWithNames = [doc6]
        .filter((file) => file.pdf && file.pdf !== null)
        .map((file) => ({
          url: file.pdf,
          name: file.fileName,
          originalfile: file.originalfile,
        }));

      setDocuments(documentsWithNames);
      onClose();
      setConfirmLoading(false);
    }, 1000);
  };

  const handleFileChange = (setDoc) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoc({
        pdf: URL.createObjectURL(file),
        fileName: file.name,
        originalfile: file,
      });
    }
  };

  const handleDelete = (setDoc) => () => {
    setDoc({
      pdf: null,
      fileName: "Archivo no seleccionado",
      originalfile: null,
    });
  };

  const handleCancel = () => {
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleAcceptAgreement = () => {
    setHasAcceptedAgreement(true);
  };

  const handleRejectAgreement = () => {
    onClose();
  };

  const allFilesSelected = [doc6].every((doc) => doc.pdf !== null);

  const renderUploadField = (id, doc, setDoc, label, detail, isRequired) => (
    <div key={id} className="text-center">
      <div>
        <p className="text-sm font-bold mb-1">{label}</p>
        <p className="text-xs text-gray-600 mb-4">{detail}</p>
      </div>
      <Form.Item
        className="flex justify-center items-center border-dashed border-2 cursor-pointer rounded-md form-color h-20"
        onClick={() => document.getElementById(`input-file-${id}`).click()}
      >
        <Input
          type="file"
          accept=".pdf"
          id={`input-file-${id}`}
          hidden
          onChange={handleFileChange(setDoc)}
        />
        {doc.pdf ? (
          <div className="flex items-center">
            <AiFillFilePdf color="#000" size={48} />
            <p className="truncate w-64" title={doc.fileName}>{doc.fileName}</p>
          </div>
        ) : (
          <>
            <MdCloudUpload color="#000" size={50} />
          </>
        )}
      </Form.Item>
      <span className="flex items-center uploaded-row">
        {doc.pdf ? (
          <>
            Eliminar archivo -{" "}
            <MdDelete className="delete-icon" onClick={handleDelete(setDoc)} />
          </>
        ) : (
          "Archivo no seleccionado"
        )}
      </span>
    </div>
  );

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
            wrapClassName="my-5 animate__animated animate__zoomIn"
          >
            {!hasAcceptedAgreement ? (
              <div className="text-center mx-4">
                <h4 className="text-lg font-bold">Acuerdo Ético</h4>
                <p>
                  Al aceptar este acuerdo, usted otorga su consentimiento explícito para el uso, almacenamiento y procesamiento de los archivos que subirá al sistema. Dichos archivos se utilizarán exclusivamente para el procesamiento de las solicitudes de la facultad y no serán compartidos con terceros.
                </p> <br />
                <p>
                  Además, usted declara y garantiza que los documentos que presenta no han sido alterados ni modificados y son auténticos. Le solicitamos que se asegure de que los documentos no contengan información sensible no autorizada para su uso en este contexto.
                </p>
                <div className="mt-4">
                  <Button type="primary" onClick={handleAcceptAgreement} className="mx-2">
                    Aceptar
                  </Button>
                  <Button type="danger" onClick={handleRejectAgreement} className="mx-2">
                    Rechazar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mx-4">
                  <h4 className="text-lg font-bold">{title}</h4>
                </div>
                <div className="flex items-center justify-center">
                  {renderUploadField(6, doc6, setDoc6, detail, true)}
                </div>
                <div className="text-center mt-2">
                  {allFilesSelected ? (
                    <Button key="submit" onClick={handleOk} className="text-white mx-auto custom-btn">
                      Cargar documentos
                    </Button>
                  ) : (
                    <Button disabled className="text-white mx-auto custom-btn">
                      Cargar documentos
                    </Button>
                  )}
                </div>
              </>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

ModalLegalizationComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setDocuments: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,  // Añadido
  detail: PropTypes.string.isRequired, // Añadido
};

export default ModalLegalizationComponent;
