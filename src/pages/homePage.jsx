import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import { IoIosCheckmarkCircle } from "react-icons/io";

const HomePage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <div>
                <h1>Home Page</h1>
                <Link to="/login">
                    <button>Ir a la página de inicio de sesión</button>
                </Link>
            </div>
            <div>
                <button onClick={handleOpenModal}>Crear Solicitud</button>
            </div>
            <ModalComponent
                title="Title 1"
                content="Solicitud creada con exito"
                icon={<IoIosCheckmarkCircle />}
                visible={modalVisible}
                onClose={handleCloseModal}

            />
        </div>
    );
}

export default HomePage;
