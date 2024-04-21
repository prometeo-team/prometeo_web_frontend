import { Button } from 'antd';
import { useState } from 'react';
import ModalLegalizationComponent from '../components/ModalLegalizationComponent';

const RegistrationLegalizationPage= () => {

    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    
  return (
    <div>
        <div>RegistrationLegalizationPage</div>
            <div>
                <Button onClick={handleOpenModal}>Crear Solicitud</Button>
            </div>
            <ModalLegalizationComponent
                visible={modalVisible}
                onClose={handleCloseModal}
            />
    </div>
    
  )
}

export default RegistrationLegalizationPage