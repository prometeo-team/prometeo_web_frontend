import React, { useState } from "react";
import {  IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { BsPersonFillCheck } from "react-icons/bs";
import { Button, Input, DatePicker } from "antd";
import ModalComponent from "./ModalComponent";
const { TextArea } = Input;

const FormConfigComponent = ({type}) => {

  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);

  const cambio1 = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleOpenModalCheck = () => {
    setModalVisibleCheck(true);
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
  };


  return (
    <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
      
      {/* Actividades */}
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            Comite academico
          </h2>
        </div>
        <div id="date_comite" className="flex w-full flex-row items-end">
          <div className="w-1/3 flex flex-col">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha 1</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <CiSquarePlus className="w-8 h-8 text-[#374151] ml-3"  />
        </div>
      </div>
      <div>
          <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            Consejo academico
          </h2>
        </div>
        <div id="date_consejo" className="flex w-full flex-row items-end">
          <div className="w-1/3 flex flex-col">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha 1</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <CiSquarePlus className="w-8 h-8 text-[#374151] ml-3"  />
        </div>
      </div>
      <div>
          <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            Legalizacion de Matricula
          </h2>
        </div>
        <div id="date_legalizacion" className="flex w-full flex-row items-end">
          <div className="w-1/3 flex flex-col">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha 1</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <CiSquarePlus className="w-8 h-8 text-[#374151] ml-3"  />
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
           Adicion de Creditos
          </h2>
        </div>
        <div id="date_adicion" className="flex w-full flex-row items-end">
          <div className="w-1/3 flex flex-col">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha 1</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <CiSquarePlus className="w-8 h-8 text-[#374151]  ml-3"  />
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            Cancelacion de creditos
          </h2>
        </div>
        <div id="date_cancelacion" className="flex w-full flex-row items-end">
          <div className="w-1/3 flex flex-col">
            <h4 className="text-md font-bold text-[#9ca3af]">Fecha 1</h4>
            <DatePicker onChange={cambio1} />
          </div>
          <CiSquarePlus className="w-8 h-8 text-[#374151] ml-3"  />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="w-52 h-12  text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-center items-center"
          onClick={handleOpenModalCheck}
        >
          <span>Guardar Cambios</span>
          <BsPersonFillCheck className="ml-2 h-5 w-6" />
        </button>
      </div>
      <ModalComponent
            visible={modalVisibleCheck}
            onClose={handleCloseModalCheck}
            content="Solicitud realizada correctamente"
            icon={<IoMdCheckmarkCircle />}
          />
    </div>
  );
};

export default FormConfigComponent;
