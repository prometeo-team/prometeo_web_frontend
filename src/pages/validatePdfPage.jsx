import  { useState } from 'react';
import { useParams } from 'react-router-dom';


const ValidatePdfPage = () => {
  const { requestId } = useParams(); // Capturar el requestId desde la URL
  const [file, setFile] = useState(null);  // Para manejar el archivo subido
  const [validationResult, setValidationResult] = useState('');  // Resultado de la validación

  // Función para manejar la subida del archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Función para validar el documento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, sube un archivo PDF para validar.");
      return;
    }

    // Crear un FormData para enviar el archivo y el requestId al backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Hacer la solicitud al backend para validar el documento
      const response = await fetch(
        `https://tu-backend.com/api/validateDocument/${requestId}`, // Ruta de tu backend
        {
          method: 'POST',
          body: formData,
        }
      );
  
      const result = await response.json(); // Parsear la respuesta como JSON
      setValidationResult(result.message);  // Mostrar el mensaje de validación
  
    } catch (error) {
      console.error("Error al validar el documento:", error);
      setValidationResult("Error al validar el documento.");
    }
  };

  return (
    <div className="validate-pdf-page">
      {requestId ? (
        <>
          <h2>Validar Documento para el Request ID: {requestId}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Sube el archivo PDF:
              <input type="file" accept=".pdf" onChange={handleFileChange} />
            </label>
            <button type="submit">Validar Documento</button>
          </form>
          {validationResult && <p>Resultado: {validationResult}</p>}
        </>
      ) : (
        <p>No se puede validar el documento sin un Request ID válido.</p>
      )}
    </div>
  );
};

export default ValidatePdfPage;
