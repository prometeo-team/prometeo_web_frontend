import { useState } from 'react';
import classNames from 'classnames';
import './NavbarTypeComponent.css';

function NavbarTypeComponent({ onClick }) {
    const [selectedButton, setSelectedButton] = useState(null); // Estado para almacenar el botón seleccionado

    const handleClick = (buttonId) => {
        setSelectedButton(buttonId); // Establece el botón seleccionado
        onClick(buttonId); // Llama a la función de onClick
    };

    const buttonData = [
        { id: 'Adición de Créditos', label: 'Adición' },
        { id: 'Retiro de Créditos', label: 'Cancelación' },
        { id: 'Incapacidades Estudiantes', label: 'Incapacidades' },
        { id: 'Supletorios', label: 'Supletorios' },
        { id: 'Postulación a Grados', label: 'Grados' },
        { id: 'Reintegro', label: 'Reintegro' },
        { id: 'Reserva de Cupo', label: 'Reserva de Cupo' },
        { id: 'Reembolso', label: 'Reembolso' },
        { id: 'Legalización de matrícula', label: 'Legalización de matrícula' },
        { id: 'Activación de Cupo', label: 'Activación de Cupo' },
        { id: 'Otras solicitudes', label: 'Otras solicitudes' },
        { id: 'all', label: 'Todas' }
    ];

    return (
        <>
            {/* Font */}
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="Navbar.css"></link>

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
            style={{ maxWidth: 'calc(100% - 8px)' }} // Ajusta el ancho total del botón
        >
            {button.label}
        </button>
    ))}
</div>



        </>
    );
}

export default NavbarTypeComponent;
