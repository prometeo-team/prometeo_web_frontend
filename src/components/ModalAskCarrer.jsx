import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import './ModalAskCarrer.css'; 

const getInfoToken = () => {
    const token = sessionStorage.getItem('token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const ModalAskCarrer = ({ isVisible, onConfirm }) => {
    const [programs, setPrograms] = useState([]);
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
        const userInfo = getInfoToken();
        console.log('userInfo:', userInfo);
        try {
            const response = await fetch(`http://127.0.0.1:3030/api/user/getProgramsStudent?username=${userInfo.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.status === "200 OK") {
                const programOptions = result.data.map(program => ({ value: program, label: program }));
                if(programOptions.length == 1){
                    setPrograms(programOptions);
                    document.getElementById('carrer_select').value = programOptions[0].value;
                    setTimeout(onConfirm,10);
                }else{
                    setPrograms(programOptions);
                }
                console.log('Programas obtenidos:', programOptions);
            } else {
                console.error("Error en la respuesta:", result.message);
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    const handleCancel = () => {
        navigate('/student/crear-solicitud');
    };

    return (
        <Modal
            open={isVisible}
            onOk={onConfirm}
            onCancel={handleCancel}
            closeIcon={null} 
        >
            <h1 className='text-3xl mb-4'>Selecione una carrera:</h1>
            <select id="carrer_select" className='w-full h-10 rounded-md  select-box'>
                <option selected disabled>Seleccione una opción</option>
                {programs.map((programs) => (
                <option id={programs.value} key={programs.value} value={programs.value}>
                    {programs.label}
                </option>
                ))}
            </select>
        </Modal>
    );
};

ModalAskCarrer.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired, 
    
};

export default ModalAskCarrer;
