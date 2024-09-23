import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import './ModalComponent.css';

const ModalComponent = ({ content, icon, visible, onClose, iconColorClass }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      onClose();
      setConfirmLoading(false);
    }, 1000); 
  };

  const handleCancel = () => {
    document.querySelector('.center-modal').classList.add('animate__zoomOut');
    setTimeout(() => {
      onClose();
    }, 500); 
  };

  return (
    <>
      {visible && ( 
        <div >
          <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            centered
            wrapClassName="center-modal animate__animated animate__zoomIn" 
          >
            <div className="items-centerf">
              <div className="flex justify-center">
                {icon && React.cloneElement(icon, { className: `icon-large mb-1 ${iconColorClass || 'icon-color'}` })}
              </div>
              <div className="flex items-center justify-center mb-10 font-bold text-xl">
                <p>{content}</p>
              </div>
              <div className="flex items-center justify-center">
                <Button key="cancel" onClick={handleCancel} className="bg-black text-white mx-auto block custom-btn h-8 w-20 text-center">
                  Cerrar
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

ModalComponent.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.element,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  iconColorClass: PropTypes.string, 
};

export default ModalComponent;
