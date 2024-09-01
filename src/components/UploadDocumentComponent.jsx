import { message, Form, Input } from "antd";
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
  requiredValue,
  id,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
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

  const handleClick = () => {
    document.getElementById(`input-file-${id}`).click(); // Utiliza un ID único para cada input
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

export default UploadDocumentComponent;
