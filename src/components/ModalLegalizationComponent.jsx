import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { AiFillFilePdf } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./ModalLegalizationComponent.css";

const ModalLegalizationComponent = ({ visible, onClose, setDocuments }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [doc6, setDoc6] = useState({ pdf: null, fileName: "Archivo no seleccionado", originalfile: null });

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const documentsWithNames = [ doc6]
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

  const allFilesSelected = [ doc6].every((doc) => doc.pdf !== null);

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
            <div className="text-center mx-4">
              <h4 className="text-lg font-bold">Documentos de Legalización Matrícula - Formato .pdf*</h4>
            </div>
            <div className="flex items-center justify-center">
              {renderUploadField(6, doc6, setDoc6, "Anexo de Afiliación EPS (Sin claves)", "Vigencia NO mayor a 30 días", true)}
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
};

export default ModalLegalizationComponent;
