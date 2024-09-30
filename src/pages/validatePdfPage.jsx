import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './validatePdfPage.css';

const ValidatePdfPage = () => {
    const { requestId } = useParams();
    const [file, setFile] = useState(null);
    const [validationResult, setValidationResult] = useState('');
    const [validationCompleted, setValidationCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Por favor, sube un archivo PDF para validar.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/validate/document/${requestId}`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            setValidationResult(result.message);
            setValidationCompleted(true);
        } catch (error) {
            console.error("Error al validar el documento:", error);
            setValidationResult("Error al validar el documento.");
            setValidationCompleted(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="validate-pdf-page">
            {requestId ? (
                <div className="modal-container">
                    {validationCompleted ? (
                        <>
                            <h2 className="modal-header">Resultado de la Validación</h2>
                            <p className="validation-result">{validationResult}</p>
                            <button 
                                className="submit-button"
                                onClick={() => navigate('/')} // Redirige a la página de inicio
                            >
                                Salir
                            </button>
                        </>
                    ) : isLoading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p>Validando el documento, por favor espera...</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="modal-header">Validacion de documentos </h2>
                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="file-upload-area">
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    <label htmlFor="file-upload" className="file-upload-label">
                                        <i className="upload-icon">&#8682;</i>
                                        <p>{file ? file.name : 'Archivo no seleccionado'}</p>
                                    </label>
                                </div>
                                <button 
                                    type="submit" 
                                    className="submit-button"
                                    disabled={!file}
                                >
                                    Cargar documentos
                                </button>
                            </form>
                        </>
                    )}
                </div>
            ) : (
                <p>No se puede validar el documento sin un Request ID válido.</p>
            )}
        </div>
    );
};

export default ValidatePdfPage;
