/* eslint-disable react/prop-types */
import { message, Form, Input } from "antd";
import "animate.css/animate.min.css";
import "./UploadDocumentComponent.css";
import { AiFillFilePdf } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const UploadDocumentComponent = ({
  onChange,
  pdf,
  fileName,
  onDelete,
  clickClassName,
  clickClassNameP,
  label,
  requiredValue,
}) => {
  const handleFileChange = ({ target: { files } }) => {
    if (files && files[0]) {
      const file = files[0];

      if (file.size > 3 * 1024 * 1024) {
        message.error(`${file.name}: El archivo no debe pesar más de 3MB`, 3);
        return;
      }
      if (!file.type.includes("pdf")) {
        message.error(`Por favor, seleccione un archivo PDF`, 3);
        return;
      }

      onChange(file);
    }
  };

  const truncateFileName = (fileName) => {
    const MAX_LENGTH = 20;
    if (fileName.length <= MAX_LENGTH) {
      return fileName;
    }
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const truncatedName =
      fileName.slice(0, MAX_LENGTH - fileExtension.length - 4) +
      "..." +
      fileExtension;
    return truncatedName;
  };

  return (
    <div>
      <span>{label}</span>
      <Form.Item
        className="form-upload"
        action=""
        onClick={() => document.querySelector(clickClassNameP).click()}
      >
        <Input
          type="file"
          accept=".pdf"
          className={clickClassName}
          hidden
          onChange={handleFileChange}
          rules={[
            {
              required: { requiredValue },
              message: "Por favor, ingrese" + { label },
              validateStatus: "error", // Agrega este atributo para controlar el color del mensaje
            },
          ]}
        />

        {pdf ? (
          <div className="pdf-preview">
            <AiFillFilePdf color="#black" size={50} />
            <p>{truncateFileName(fileName)}</p>
          </div>
        ) : (
          <>
            <MdCloudUpload color="#black" size={50} />
          </>
        )}
      </Form.Item>

      <span className="upload-content uploaded-row">
        {fileName === "Archivo no seleccionado" ? (
          "Archivo no seleccionado"
        ) : (
          <>
            Eliminar archivo -
            <MdDelete className="delete-icon" onClick={onDelete} />
          </>
        )}
      </span>
    </div>
  );
};

export default UploadDocumentComponent;
