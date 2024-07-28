import { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const comiteDates = ['2024-01-01', '2024-02-01', '2024-03-01'];
  const consejoDates = ['2024-01-15', '2024-02-15', '2024-03-15'];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        className="color-button text-sm md:text-base lg:text-2xl h-auto mt-4 rounded-[10px] px-[20px] py-[10px] hover:bg-black"
        type="primary" onClick={showModal}>
        Lista de fechas
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
        wrapClassName="center-modal animate__animated animate__zoomIn"
      >
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="px-4 py-2 text-xl font-bold text-black">Fechas de Comité</th>
                  <th className="px-4 py-2 text-xl font-bold text-black">Fechas de Consejo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="block md:table-row">
                  <td className="w-full md:w-auto px-4 py-2 align-top">
                    <span className="block md:hidden font-bold text-xl text-black">Fechas de Comité</span>
                    <ul className="list-disc list-inside">
                      {comiteDates.map((date, index) => (
                        <li key={index}>{date}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-full md:w-auto px-4 py-2 align-top hidden md:table-cell">
                    <ul className="list-disc list-inside">
                      {consejoDates.map((date, index) => (
                        <li key={index}>{date}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className="block md:table-row">
                  <td className="block md:table-cell px-4 py-2 align-top md:hidden">
                    <span className="block md:hidden font-bold text-xl text-black">Fechas de Consejo</span>
                    <ul className="list-disc list-inside">
                      {consejoDates.map((date, index) => (
                        <li key={index}>{date}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalList;
