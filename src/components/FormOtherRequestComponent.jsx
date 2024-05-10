import React, { useState } from "react";
import ModalOtherRequestComponent from "./ModalOtherRequestComponent";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { LuUserCheck2, LuUpload } from "react-icons/lu";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import { Button, Input } from "antd";
import ModalComponent from "./ModalComponent";
const { TextArea } = Input;

const FormOtherRequestComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [documents, setDocuments] = useState([]);


  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModalCheck = () => {
    setModalVisibleCheck(true);
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
  };

  const [value, setValue] = useState("");

  return (
    <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
      <Link to="/student/crear-solicitud">
        <button className="w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color">
          <IoIosArrowBack className=" h-7 w-7" />
          <span className="ml-2">Volver</span>
        </button>
      </Link>
      {/* Información del estudiante */}
      <h2 className="text-xl font-bold text-black ml-2 mt-5 mb-5">
        Descripción de la solicitud
      </h2>
      <div className="studentInfo_container ml-2 gap-5">
      <div className="">
            <TextArea 
              showCount
              maxLength={200}
              onChange={(e) => setValue(e.target.value)}
              style={{ height: 130, resize: "none" }}
            />
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black mt-6"></div>
      </div>
      {/* Documentos */}
      <div className="ml-2 flex flex-col w-full">
        <h2 className="text-xl flex font-bold text-black mt-5 mb-5">Documentos 
          <Button onClick={handleOpenModal} className="w-62 h-12 ml-4 text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-between items-center">
            Adjuntar Documentos <LuUpload className="ml-2 h-7 w-7" />
          </Button>
        </h2>
        <div className="col-span-2">
          <ModalOtherRequestComponent
            visible={modalVisible}
            onClose={handleCloseModal}
            setDocuments={setDocuments}
          />
        </div>
        <div className="grid gap-4">
          {documents.slice(0, 6).map((document, index) => (
            <React.Fragment key={index}>
              {(
                <div className="mb-4">
                  <div className="border bg-gray-200 rounded-md p-2 mb-2 overflow-hidden">
                    <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {document.name.length > 20 ? `${document.name.slice(0, 20)}...pdf` : document.name}
                    </div>
                    <div>
                      <a href={document.url} target="_blank" rel="noopener noreferrer" className='font-color font-bold'>
                        Ver documento
                      </a>
                    </div>
                  </div>
                  {index + 1 < documents.length && (
                    <div className="border bg-gray-200 rounded-md p-2 overflow-hidden">
                      <div className="truncate" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {documents[index + 1].name.length > 20 ? `${documents[index + 1].name.slice(0, 20)}...pdf` : documents[index + 1].name}
                      </div>
                      <div>
                        <a href={documents[index + 1].url} target="_blank" rel="noopener noreferrer" className='font-color font-bold'>
                          Ver documento
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(
                <div className='flex items-start justify-start'>
                  <button
                    className="w-52 h-12 text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-center items-center"
                    onClick={handleOpenModalCheck}
                  >
                    <span>Generar Solicitud</span>
                    <BsPersonFillCheck className="ml-2 h-5 w-6" />
                  </button>
                  <ModalComponent
                    visible={modalVisibleCheck}
                    onClose={handleCloseModalCheck}
                    content="Solicitud realizada correctamente"
                    icon={<IoMdCheckmarkCircle />}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FormOtherRequestComponent;
