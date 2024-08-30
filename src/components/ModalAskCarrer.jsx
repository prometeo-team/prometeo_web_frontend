import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd'; // Importa el componente Button
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ModalAskCarrer.css';
import Loader from './LoaderComponent.jsx';

const getInfoToken = () => {
    const token = sessionStorage.getItem('token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const ModalAskCarrer = ({ isVisible, onConfirm }) => {
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('modal-body-blur');
            fetchPrograms();
        } else {
            document.body.classList.remove('modal-body-blur');
        }
    }, [isVisible]);

    const fetchPrograms = async () => {
        setIsLoading(true); // Mostrar el loader
        const userInfo = getInfoToken();
        console.log('userInfo:', userInfo);
        try {
            const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/getProgramsStudent?username=${userInfo.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.status === "200 OK") {
                const programOptions = result.data.map(program => ({ value: program, label: program }));

                if (programOptions.length === 1) {
                    setPrograms(programOptions);
                    document.getElementById('carrer_select').value = programOptions[0].value;
                    setTimeout(onConfirm, 10);
                } else {
                    setPrograms(programOptions);
                }
                console.log('Programas obtenidos:', programOptions);
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        } finally {
            setIsLoading(false); // Ocultar el loader después de procesar la respuesta
        }
    };

    const handleCancel = () => {
        navigate('/student/crear-solicitud');
    };

    return (
        <Modal
            open={isVisible}
            footer={null} // Elimina el footer para usar botones personalizados
            onCancel={handleCancel}
            closeIcon={null}
            className="modal-ask-carrer"
        >
            {isLoading ? (
                <div className="flex items-center justify-center h-32">
                    <Loader className="h-10 w-10" />
                </div>
            ) : (
                <>
                    <h1 className='text-3xl mb-4'>Seleccione una carrera:</h1>
                    <select id="carrer_select" className='w-full h-10 rounded-md select-box bg-gray-200 rounded-md p-2'>
                        <option selected disabled>Seleccione una opción</option>
                        {programs.map((program) => (
                            <option id={program.value} key={program.value} value={program.value}>
                                {program.label}
                            </option>
                        ))}
                    </select>
                    <div className="mt-6 flex justify-end">
                        <Button type="primary" className='bg-[#97B749]' onClick={onConfirm}>
                            OK
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
};

ModalAskCarrer.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ModalAskCarrer;
