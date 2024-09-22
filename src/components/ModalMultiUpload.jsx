import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ModalMultiUploadComponent.css";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalDegreeComponent = ({ visible, onClose, setDocuments, title, detail}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pdf1, setPdf1] = useState(null);
  const [fileName1, setFileName1] = useState("Archivo no seleccionado");
  const [originalfile1, setOriginalfile1] = useState(null);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const documentsWithNames = [
        pdf1 && { url: pdf1, name: fileName1, originalfile: originalfile1 },
      ].filter(doc => doc !== null);
      setDocuments(documentsWithNames);
      onClose(true);
      setConfirmLoading(false);
    }, 1000);
  };

  const allFilesSelected = pdf1;

  const handleCancel = () => {
    document.querySelector(".center-modal").classList.add("animate__zoomOut");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleFileChange1 = (file) => {
    console.log("file1");
    console.log(file);
    setFileName1(file[0].fileName);
    setPdf1(file[0].pdf);
    setOriginalfile1(file[0].originalfile);
  };


  const handleDelete1 = () => {
    setFileName1("Archivo no seleccionado");
    setPdf1(null);
    setOriginalfile1(null);
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
                <h4 className="text-lg font-bold">{title}</h4>
              </div>
              <div className="flex flex-col max-md:w-full">
                <div className="flex flex-row max-md:flex-col justify-around items-end">
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="1"
                      onChange={handleFileChange1}
                      pdf={pdf1}
                      fileName={fileName1}
                      onDelete={handleDelete1}
                      clickClassNameP=".input-field1"
                      clickClassName="input-field1"
                      label=''
                      detail={detail}
                      isRequired={true}
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

ModalDegreeComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setDocuments: PropTypes.func.isRequired,
};

export default ModalDegreeComponent;
