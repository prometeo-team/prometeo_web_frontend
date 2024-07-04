import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ModalDegreeComponent.css";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalDegree2Component = ({ visible, onClose, setDocuments }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
  const [pdf4, setPdf4] = useState(null);
  const [pdf5, setPdf5] = useState(null);
  const [pdf6, setPdf6] = useState(null);
  const [pdf7, setPdf7] = useState(null);
  const [pdf8, setPdf8] = useState(null);
  const [fileName1, setFileName1] = useState("Archivo no seleccionado");
  const [fileName2, setFileName2] = useState("Archivo no seleccionado");
  const [fileName3, setFileName3] = useState("Archivo no seleccionado");
  const [fileName4, setFileName4] = useState("Archivo no seleccionado");
  const [fileName5, setFileName5] = useState("Archivo no seleccionado");
  const [fileName6, setFileName6] = useState("Archivo no seleccionado");
  const [fileName7, setFileName7] = useState("Archivo no seleccionado");
  const [fileName8, setFileName8] = useState("Archivo no seleccionado");

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const documentsWithNames = [
        pdf1 && { url: pdf1, name: fileName1 },
        pdf2 && { url: pdf2, name: fileName2 },
        pdf3 && { url: pdf3, name: fileName3 },
        pdf4 && { url: pdf4, name: fileName4 },
        pdf5 && { url: pdf5, name: fileName5 },
        pdf6 && { url: pdf6, name: fileName6 },
        pdf7 && { url: pdf7, name: fileName7 },
        pdf8 && { url: pdf8, name: fileName8 },
      ].filter(doc => doc !== null);
      setDocuments(documentsWithNames);
      onClose();
      setConfirmLoading(false);
    }, 1000);
  };

  const allFilesSelected = pdf1 && pdf2 && pdf3 && pdf4 && pdf5 && pdf6 && pdf7 ;

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

  const handleFileChange7 = (file) => {
    setFileName7(file.name);
    setPdf7(URL.createObjectURL(file));
  };

  const handleFileChange8 = (file) => {
    setFileName8(file.name);
    setPdf8(URL.createObjectURL(file));
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

  const handleDelete7 = () => {
    setFileName7("Archivo no seleccionado");
    setPdf7(null);
  };

  const handleDelete8 = () => {
    setFileName8("Archivo no seleccionado");
    setPdf8(null);
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
              <div className="text-center mb-4 ">
                <h4 className="text-lg font-bold">Documentos de Postulación a grados - Formato .pdf*</h4>
              </div>
              <div className="flex flex-col max-md:w-full">
                <div className="flex flex-row max-md:flex-col justify-around items-end">
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange1}
                      pdf={pdf1}
                      fileName={fileName1}
                      onDelete={handleDelete1}
                      clickClassNameP=".input-field1"
                      clickClassName="input-field1"
                      label="Copia Documento de Identidad"
                      detail=""
                      isRequired={true}
                    />
                  </div>
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange2}
                      pdf={pdf2}
                      fileName={fileName2}
                      onDelete={handleDelete2}
                      clickClassNameP=".input-field2"
                      clickClassName="input-field2"
                      label="Acta de Aprobacion Trabajo de Grado"
                      detail="Entregada por los jurados"
                      isRequired={false}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange3}
                      pdf={pdf3}
                      fileName={fileName3}
                      onDelete={handleDelete3}
                      clickClassNameP=".input-field3"
                      clickClassName="input-field3"
                      label="Copia del Diploma y Acta de Pregrado"
                      detail=""
                      isRequired={true}
                    />
                  </div>
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange4}
                      pdf={pdf4}
                      fileName={fileName4}
                      onDelete={handleDelete4}
                      clickClassNameP=".input-field4"
                      clickClassName="input-field4"
                      label="Certificado De Suficiencia Ingles"
                      detail="Expedido por el centro de lenguas"
                      isRequired={false}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange5}
                      pdf={pdf5}
                      fileName={fileName5}
                      onDelete={handleDelete5}
                      clickClassNameP=".input-field5"
                      clickClassName="input-field5"
                      label="Pago Derechos de Grado"
                      detail=""
                      isRequired={true}
                    />
                  </div>
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange6}
                      pdf={pdf6}
                      fileName={fileName6}
                      onDelete={handleDelete6}
                      clickClassNameP=".input-field6"
                      clickClassName="input-field6"
                      label="Paz y Salvo emitido por el area finaciera"
                      detail=""
                      isRequired={true}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange7}
                      pdf={pdf7}
                      fileName={fileName7}
                      onDelete={handleDelete7}
                      clickClassNameP=".input-field7"
                      clickClassName="input-field7"
                      label="Evidencia del Tebajo de Grado"
                      detail="En el Repocitorio de la Biblioteca de la UEB"
                      isRequired={true}
                    />
                  </div>
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      onChange={handleFileChange8}
                      pdf={pdf8}
                      fileName={fileName8}
                      onDelete={handleDelete8}
                      clickClassNameP=".input-field8"
                      clickClassName="input-field8"
                      label="Fotocopia de VISA vigente"
                      detail="Unicamente para estudiantes Extrangeros"
                      isRequired={false}
                    />
                  </div>
                </div>
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

ModalDegree2Component.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setDocuments: PropTypes.func.isRequired,
};

export default ModalDegree2Component;
