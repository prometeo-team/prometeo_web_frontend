import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "animate.css/animate.min.css";
import "./ModalLegalizationComponent.css";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalLegalizationComponent = ({ visible, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
  const [pdf4, setPdf4] = useState(null);
  const [pdf5, setPdf5] = useState(null);
  const [pdf6, setPdf6] = useState(null);
  const [fileName1, setFileName1] = useState("Archivo no seleccionado");
  const [fileName2, setFileName2] = useState("Archivo no seleccionado");
  const [fileName3, setFileName3] = useState("Archivo no seleccionado");
  const [fileName4, setFileName4] = useState("Archivo no seleccionado");
  const [fileName5, setFileName5] = useState("Archivo no seleccionado");
  const [fileName6, setFileName6] = useState("Archivo no seleccionado");

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
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

  const handleFileChange1 = (file) => {
    setFileName1(file.name);
    setPdf1(URL.createObjectURL(file));
  };

  const handleFileChange2 = (file) => {
    setFileName2(file.name);
    setPdf2(URL.createObjectURL(file));
  };

  const handleFileChange3 = (file) => {
    setFileName3(file.name);
    setPdf3(URL.createObjectURL(file));
  };

  const handleFileChange4 = (file) => {
    setFileName4(file.name);
    setPdf4(URL.createObjectURL(file));
  };

  const handleFileChange5 = (file) => {
    setFileName5(file.name);
    setPdf5(URL.createObjectURL(file));
  };

  const handleFileChange6 = (file) => {
    setFileName6(file.name);
    setPdf6(URL.createObjectURL(file));
  };

  const handleDelete1 = () => {
    setFileName1("Archivo no seleccionado");
    setPdf1(null);
  };

  const handleDelete2 = () => {
    setFileName2("Archivo no seleccionado");
    setPdf2(null);
  };

  const handleDelete3 = () => {
    setFileName3("Archivo no seleccionado");
    setPdf3(null);
  };

  const handleDelete4 = () => {
    setFileName4("Archivo no seleccionado");
    setPdf4(null);
  };

  const handleDelete5 = () => {
    setFileName5("Archivo no seleccionado");
    setPdf5(null);
  };

  const handleDelete6 = () => {
    setFileName6("Archivo no seleccionado");
    setPdf6(null);
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
            wrapClassName="center-modal animate__animated animate__zoomIn "
          >
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold">Documentos de Legalizacion Matricula - Formato .pdf*</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <UploadDocumentComponent
                onChange={handleFileChange1}
                pdf={pdf1}
                fileName={fileName1}
                onDelete={handleDelete1}
                clickClassNameP=".input-field1"
                clickClassName="input-field1"
                label="Documento de identidad al 150%"
                detail="Para estudiantes Extranjeros Cédula de Extranjería o Pasaporte Vigente"
                isRequired={true}
              />

              <UploadDocumentComponent
                onChange={handleFileChange2}
                pdf={pdf2}
                fileName={fileName2}
                onDelete={handleDelete2}
                clickClassNameP=".input-field2"
                clickClassName="input-field2"
                label="Anexo Pregrado o Postgrado"
                detail="Saber 11 (Pregrado), acta de grado o diploma (Pregrado o Postgrado)"
                isRequired={false}
              />

              <UploadDocumentComponent
                onChange={handleFileChange3}
                pdf={pdf3}
                fileName={fileName3}
                onDelete={handleDelete3}
                clickClassNameP=".input-field3"
                clickClassName="input-field3"
                label="Anexo Estudiantes extranjeros"
                detail="Visa, PEP, PPT, según corresponda para cada caso"
                isRequired={false}
              />

              <UploadDocumentComponent
                onChange={handleFileChange4}
                pdf={pdf4}
                fileName={fileName4}
                onDelete={handleDelete4}
                clickClassNameP=".input-field4"
                clickClassName="input-field4"
                label="Anexo Comprobante de Pago de Matrícula*"
                detail="-"
                isRequired={false}
              />

              <UploadDocumentComponent
                onChange={handleFileChange5}
                pdf={pdf5}
                fileName={fileName5}
                onDelete={handleDelete5}
                clickClassNameP=".input-field5"
                clickClassName="input-field5"
                label="Formato de registro de matricula"
                detail="-"
                isRequired={false}
              />

              <UploadDocumentComponent
                onChange={handleFileChange6}
                pdf={pdf6}
                fileName={fileName6}
                onDelete={handleDelete6}
                clickClassNameP=".input-field6"
                clickClassName="input-field6"
                label="Anexo de Afiliación EPS (Sin claves)"
                detail="Vigencia NO mayor a 30 días"
                isRequired={true}
              />

              
            </div>
            <div className="text-center mt-2">
                <Button
                  key="cancel"
                  onClick={handleCancel}
                  className="text-white mx-auto custom-btn"
                >
                  Cargar documentos
                </Button>
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
};

export default ModalLegalizationComponent;
