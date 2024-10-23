import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ModalDegreeComponent.css";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalDegreeComponent = ({ visible, onClose, setDocuments }) => {
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
     
     
    setFileName1(file[0].fileName);
    setPdf1(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"__Finanzas.pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile1(newfile);
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
                <h4 className="text-lg font-bold">Paz y salvo Finanzas</h4>
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
                      label=""
                      detail=""
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
