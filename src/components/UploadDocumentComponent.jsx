import { useState } from "react";
import { message, Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { AiFillFilePdf } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./UploadDocumentComponent.css";

const UploadDocumentComponent = ({
  onChange,
  pdf,
  fileName,
  onDelete,
  label,
  detail,
  id,
}) => {
  const [hasAcceptedAgreement, setHasAcceptedAgreement] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!hasAcceptedAgreement) {
      message.warning("Debe aceptar el acuerdo ético para continuar.");
      return;
    }
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        message.error(`${file.name}: El archivo no debe pesar más de 10MB`, 10);
        return;
      }
      if (!file.type.includes("pdf")) {
        message.error(`Por favor, seleccione un archivo PDF`, 3);
        return;
      }
      onChange([{ id: id, fileName: file.name, pdf: URL.createObjectURL(file), originalfile: file, label: label, detail: detail }]);
    }
  };

  const handleClick = () => {
    if (!hasAcceptedAgreement) {
      showAgreementModal();
    } else {
      document.getElementById(`input-file-${id}`).click(); // Utiliza un ID único para cada input
    }
  };

  const showAgreementModal = () => {
    Modal.confirm({
      title: "Acuerdo Ético",
      content: (
        <div>
          <p>
            Al aceptar este acuerdo, usted otorga su consentimiento explícito para el uso, almacenamiento y procesamiento de los archivos que subirá al sistema. Dichos archivos se utilizarán exclusivamente para el procesamiento de las solicitudes de la facultad y no serán compartidos con terceros.
          </p> <br />
          <p>
            Además, usted declara y garantiza que los documentos que presenta no han sido alterados ni modificados y son auténticos. Le solicitamos que se asegure de que los documentos no contengan información sensible no autorizada para su uso en este contexto.
          </p>
        </div>
      ),
      okText: "Aceptar",
      okType: "primary",
      cancelText: "Rechazar",
      onOk: () => setHasAcceptedAgreement(true),
      onCancel: () => message.info("Debe aceptar el acuerdo ético para continuar."),
    });
  };

  const truncateFileName = (fileName) => {
    if (!fileName) return ""; // Maneja el caso cuando `fileName` es `undefined`

    const MAX_LENGTH = 20;
    if (fileName.length <= MAX_LENGTH) {
      return fileName;
    }
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
    const truncatedName = fileName.slice(0, MAX_LENGTH - fileExtension.length - 4) + "..." + fileExtension;
    return truncatedName;
  };

  return (
    <div className="text-center">
      <div>
        <p className="text-sm font-bold mb-1">{label}</p>
        <p className="text-xs text-gray-600 mb-4">{detail}</p>
      </div>
      <Form.Item
        className="flex justify-center items-center border-dashed border-2 cursor-pointer rounded-md form-color h-20"
        onClick={handleClick} // Usamos una función específica para manejar el clic
      >
        <Input
          type="file"
          accept=".pdf"
          id={`input-file-${id}`} // ID único basado en el ID del documento
          hidden
          onChange={handleFileChange}
        />

        {pdf ? (
          <div className="flex items-center">
            <AiFillFilePdf color="#000" size={48} />
            <p>{truncateFileName(fileName)}</p>
          </div>
        ) : (
          <>
            <MdCloudUpload color="#000" size={50} />
          </>
        )}
      </Form.Item>

      <span className="flex items-center uploaded-row">
        {fileName === "Archivo no seleccionado" ? (
          "Archivo no seleccionado"
        ) : (
          <>
            Eliminar archivo -{" "}
            <MdDelete className="delete-icon" onClick={() => onDelete(id)} />
          </>
        )}
      </span>
    </div>
  );
};

UploadDocumentComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  pdf: PropTypes.string,
  fileName: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default UploadDocumentComponent;
