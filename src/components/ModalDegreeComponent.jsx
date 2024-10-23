import { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ModalDegreeComponent.css";
import UploadDocumentComponent from "./UploadDocumentComponent";

const ModalDegreeComponent = ({ visible, onClose, setDocuments, document_type }) => {
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
  const [originalfile1, setOriginalfile1] = useState(null);
  const [originalfile2, setOriginalfile2] = useState(null);
  const [originalfile3, setOriginalfile3] = useState(null);
  const [originalfile4, setOriginalfile4] = useState(null);
  const [originalfile5, setOriginalfile5] = useState(null);
  const [originalfile6, setOriginalfile6] = useState(null);
  const [originalfile7, setOriginalfile7] = useState(null);
  const [originalfile8, setOriginalfile8] = useState(null);
  let allFilesSelected;

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const documentsWithNames = [
        pdf1 && { url: pdf1, name: fileName1, originalfile: originalfile1 },
        pdf2 && { url: pdf2, name: fileName2, originalfile: originalfile2 },
        pdf3 && { url: pdf3, name: fileName3, originalfile: originalfile3 },
        pdf4 && { url: pdf4, name: fileName4, originalfile: originalfile4 },
        pdf5 && { url: pdf5, name: fileName5, originalfile: originalfile5 },
        pdf6 && { url: pdf6, name: fileName6, originalfile: originalfile6 },
        pdf7 && { url: pdf7, name: fileName7, originalfile: originalfile7 },
        pdf8 && { url: pdf8, name: fileName8, originalfile: originalfile8 },
      ].filter(doc => doc !== null);
      setDocuments(documentsWithNames);
      onClose(true);
      setConfirmLoading(false);
    }, 1000);
  };
  if((document_type=="Cédula de Ciudadanía" || document_type=="Tarjeta de Identidad")){
    allFilesSelected = pdf1  && pdf2  && pdf3 && pdf4 && pdf5 && pdf6 && pdf8;
  }else{
    allFilesSelected = pdf1  && pdf3  && pdf5 && pdf6 && pdf7 && pdf8;
  }
 

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
    name = name+"(Diploma o Convalidación).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile1(newfile);
  };

  const handleFileChange2 = (file) => {
    setFileName2(file[0].fileName);
    setPdf2(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(Acta de grado).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile2(newfile);
  };

  const handleFileChange3 = (file) => {
    setFileName3(file[0].fileName);
    setPdf3(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(Documento de Identidad).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile3(newfile);
  };

  const handleFileChange4 = (file) => {
    setFileName4(file[0].fileName);
    setPdf4(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(SABER 11).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile4(newfile);
  };

  const handleFileChange5 = (file) => {
    setFileName5(file[0].fileName);
    setPdf5(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(Afiliación EPS).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile5(newfile);
  };

  const handleFileChange6 = (file) => {
    setFileName6(file[0].fileName);
    setPdf6(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(SABER PRO).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile6(newfile);
  };

  const handleFileChange7 = (file) => {
    setFileName7(file[0].fileName);
    setPdf7(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(VISA).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile7(newfile);
  };

  const handleFileChange8 = (file) => {
    setFileName8(file[0].fileName);
    setPdf8(file[0].pdf);
    var name = file[0].fileName;
     
    name = name.split(".pdf")[0];
    name = name+"(Formato solicitud de grado).pdf";
    const originalFile2 = file[0].originalfile;
    const newfile = new File([originalFile2], name, { type: originalFile2.type })
    setOriginalfile8(newfile);
  };

  const handleDelete1 = () => {
    setFileName1("Archivo no seleccionado");
    setPdf1(null);
    setOriginalfile1(null);
  };

  const handleDelete2 = () => {
    setFileName2("Archivo no seleccionado");
    setPdf2(null);
    setOriginalfile2(null);
  };

  const handleDelete3 = () => {
    setFileName3("Archivo no seleccionado");
    setPdf3(null);
    setOriginalfile3(null);
  };

  const handleDelete4 = () => {
    setFileName4("Archivo no seleccionado");
    setPdf4(null);
    setOriginalfile4(null);
  };

  const handleDelete5 = () => {
    setFileName5("Archivo no seleccionado");
    setPdf5(null);
    setOriginalfile5(null);
  };

  const handleDelete6 = () => {
    setFileName6("Archivo no seleccionado");
    setPdf6(null);
    setOriginalfile6(null);
  };

  const handleDelete7 = () => {
    setFileName7("Archivo no seleccionado");
    setPdf7(null);
    setOriginalfile7(null);
  };

  const handleDelete8 = () => {
    setFileName8("Archivo no seleccionado");
    setPdf8(null);
    setOriginalfile8(null);
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
                      id="1"
                      onChange={handleFileChange1}
                      pdf={pdf1}
                      fileName={fileName1}
                      onDelete={handleDelete1}
                      clickClassNameP=".input-field1"
                      clickClassName="input-field1"
                      label="Diploma de Bachiller"
                      detail="Para Estudiantes Extranjeros Convalidación ante el Ministerio de Educación"
                      isRequired={true}
                    />
                  </div>
                  {(document_type=="Cédula de Ciudadanía" || document_type=="Tarjeta de Identidad") && (
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="2"
                      onChange={handleFileChange2}
                      pdf={pdf2}
                      fileName={fileName2}
                      onDelete={handleDelete2}
                      clickClassNameP=".input-field2"
                      clickClassName="input-field2"
                      label="Acta de Grado Bachiller"
                      detail="-"
                      isRequired={false}
                    />
                  </div>
                  )}
                  
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                  
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="3"
                      onChange={handleFileChange3}
                      pdf={pdf3}
                      fileName={fileName3}
                      onDelete={handleDelete3}
                      clickClassNameP=".input-fiel3"
                      clickClassName="input-field3"
                      label="Documento de Identidad ampliado al 150%*"
                      detail="Para estudiantes Extranjeros Cédula de Extranjería o Pasaporte Vigente"
                      isRequired={true}
                    />
                  </div>
                  
                  {(document_type=="Cédula de Ciudadanía" || document_type=="Tarjeta de Identidad") && (
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="4"
                      onChange={handleFileChange4}
                      pdf={pdf4}
                      fileName={fileName4}
                      onDelete={handleDelete4}
                      clickClassNameP=".input-field4"
                      clickClassName="input-field4"
                      label="Certificado ICFES SABER 11"
                      detail="-"
                      isRequired={false}
                    />
                  </div>
                  )}
                     
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                <div className="w-5/12 max-md:w-full">
                     <UploadDocumentComponent
                      id="5"
                      onChange={handleFileChange5}
                      pdf={pdf5}
                      fileName={fileName5}
                      onDelete={handleDelete5}
                      clickClassNameP=".input-field5"
                      clickClassName="input-field5"
                      label="Anexo de Afiliación EPS (Sin claves)"
                      detail="Vigencia NO mayor a 30 días"
                      isRequired={true}
                    />
                  </div>
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="6"
                      onChange={handleFileChange6}
                      pdf={pdf6}
                      fileName={fileName6}
                      onDelete={handleDelete6}
                      clickClassNameP=".input-field6"
                      clickClassName="input-field6"
                      label="Certificado De Asistencia al Examen SABER PRO (ECAES)"
                      detail="-"
                      isRequired={true}
                    />
                  </div>
                  
                </div>
                <div className="flex flex-row justify-around items-end max-md:flex-col">
                  {(document_type!="Cédula de Ciudadanía" && document_type!="Tarjeta de Identidad")&& (
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="7"
                      onChange={handleFileChange7}
                      pdf={pdf7}
                      fileName={fileName7}
                      onDelete={handleDelete7}
                      clickClassNameP=".input-field7"
                      clickClassName="input-field7"
                      label="Fotocopia de VISA vigente"
                      detail="Unicamente para estudiantes Extranjeros, PEP o PPT únicamente para estudiantes extranjeros de Nacionalidad Venezolana"
                      isRequired={false}
                    />
                  </div>
                  )}
                  <div className="w-5/12 max-md:w-full">
                    <UploadDocumentComponent
                      id="8"
                      onChange={handleFileChange8}
                      pdf={pdf8}
                      fileName={fileName8}
                      onDelete={handleDelete8}
                      clickClassNameP=".input-field8"
                      clickClassName="input-field8"
                      label="Formato solicitud de grado"
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
