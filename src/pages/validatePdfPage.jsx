import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './validatePdfPage.css';

const ValidatePdfPage = () => {
    const { requestId } = useParams();
    const location = useLocation();
    const [fileUrl, setFileUrl] = useState(null);
    const [fileBlob, setFileBlob] = useState(null);
    const [validationResult, setValidationResult] = useState('');
    const [validationCompleted, setValidationCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Nueva bandera
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const url = queryParams.get('pdfUrl');
         

        if (!url) {
            console.error("No se proporcionó una URL para el archivo.");
            return;
        }

        setFileUrl(url);

        // Descargamos el archivo como Blob
        const downloadFile = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al descargar el archivo");
                }
                const blob = await response.blob();
                setFileBlob(blob);
            } catch (error) {
                console.error("Error al descargar el archivo:", error);
            }
        };

        downloadFile();
    }, [location.search]);

    // Nuevo useEffect para detectar cuando fileBlob cambia y no estamos ya enviando
    useEffect(() => {
        if (fileBlob && !isSubmitting && !validationCompleted) {
            handleSubmit();
        }
    }, [fileBlob]);

    const handleSubmit = async () => {
        if (!fileBlob) {
            alert("No se pudo descargar el archivo. Intenta de nuevo.");
            return;
        }

        setIsLoading(true);
        setIsSubmitting(true); // Evitar múltiples envíos

        // Creamos un FormData y adjuntamos el Blob directamente
        const formData = new FormData();
        // Extraer el nombre de archivo de la URL si es posible
        const filename = extractFilenameFromUrl(fileUrl) || 'documento.pdf';
        formData.append("file", fileBlob, filename);

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
            setIsSubmitting(false); // Restablecer la bandera
        }
    };

    // Función para extraer el nombre de archivo de la URL
    const extractFilenameFromUrl = (url) => {
        return url.substring(url.lastIndexOf('/') + 1);
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
                                onClick={() => navigate('/')} 
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
                            <h2 className="modal-header">Validación de documentos</h2>
                            <div className="file-upload-area">
                                <p>{fileBlob ? 'Archivo cargado. Iniciando validación...' : 'Cargando archivo desde la URL...'}</p>
                            </div>
                            {/* Eliminamos el botón de validación */}
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
