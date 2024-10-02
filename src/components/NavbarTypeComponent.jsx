import { useState } from 'react';
import classNames from 'classnames';
import { VscDesktopDownload } from "react-icons/vsc";
import './NavbarTypeComponent.css';

function NavbarTypeComponent({ onClick }) {
    const [selectedButton, setSelectedButton] = useState('all');

    const handleClick = (buttonId) => {
        setSelectedButton(buttonId);
        onClick(buttonId);
    };

    const handleReportDownload = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/student/getExcelLegalization`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
    
            if (!response.ok) {
                console.error("Error en la respuesta del servidor:", response.status);
                return;
            }
    
            const result = await response.json();
    
            if (result.status === "200 OK") {
                const fileUrl = result.data;
    
                if (fileUrl) {
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.setAttribute('download', 'reporte_legalizacion.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
        }
    };
    
    

    const buttonData = [
        { id: 'Adición de créditos', label: 'Adición de créditos' },
        { id: 'Retiro de créditos', label: 'Retiro de créditos' },
        { id: 'Incapacidades Estudiantes', label: 'Incapacidades' },
        { id: 'Supletorios', label: 'Supletorios' },
        { id: 'Postulación a grados', label: 'Grados' },
        { id: 'Reintegro', label: 'Reintegro' },
        { id: 'Reserva de cupo', label: 'Reserva de cupo' },
        { id: 'Reembolso', label: 'Reembolso' },
        { id: 'Legalización de matrícula', label: 'Legalización de matrícula' },
        { id: 'Activación de cupo', label: 'Activación reserva de cupo' },
        { id: 'Otras solicitudes', label: 'Otras solicitudes' },
        { id: 'all', label: 'Todas' }
    ];

    return (
        <>
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="stylesheet"></link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full p-4 max-w-4xl mx-auto">
                {buttonData.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => handleClick(button.id)}
                        className={classNames(
                            'text-white py-2 px-4 rounded-lg transition-colors w-full m-0',
                            selectedButton === button.id ? 'bg-[#43737E]' : 'bg-[#97B749]',
                            'hover:bg-[#43737E]'
                        )}
                        style={{ maxWidth: 'calc(100% - 8px)' }}
                    >
                        {button.label}
                    </button>
                ))}

                {selectedButton === "Legalización de matrícula" && (
                    <div className="col-span-1 lg:col-start-2 flex">
                        <button
                            onClick={handleReportDownload}  // Llama a la función de descarga
                            className={classNames(
                                'flex items-center justify-between text-white py-2 px-4 rounded-lg transition-colors w-full m-0',
                                'bg-[#97B749]',
                                'hover:bg-[#43737E]'
                            )}
                            style={{ maxWidth: 'calc(100% - 7px)' }}
                        >
                            <span>Reporte legalización</span>
                            <VscDesktopDownload className='w-6 h-6 ml-2' /> 
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavbarTypeComponent;
