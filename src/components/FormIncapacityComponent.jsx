import React, { useState } from "react";
import ModalIncapacityComponent from "../components/ModalIncapacityComponent";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import { Button, Input } from "antd";
import ModalComponent from "./ModalComponent";
const { TextArea } = Input;

const FormIncapacityComponent = () => {
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
        Información del estudiante
      </h2>
      <div className="studentInfo_container ml-2 grid grid-cols-3 gap-4">
        <div className="First Row">
          <h3 className="text-black">Tipo de documento</h3>
          <InputComponent type="readOnly" placeholder="Cédula de Ciudadanía" />
          <h3 className="text-black">Apellidos</h3>
          <InputComponent type="readOnly" placeholder="Perez" />
          <h3 className="text-black">Carrera</h3>
          <InputComponent
            type="box"
            placeholder="Carrera"
            variant="form-input"
            options={[
              { value: "BI", label: "Bioingeniería" },
              { value: "IA", label: "Ingeniería Ambiental" },
              { value: "IS", label: "Ingeniería de Sistemas" },
              { value: "IE", label: "Ingeniería Electrónica" },
              { value: "II", label: "Ingeniería Industrial" },
            ]}
          />
        </div>
        <div className="Second Row">
          <h3 className="text-black">No. de documento</h3>
          <InputComponent type="readOnly" placeholder="Cédula de Ciudadanía" />
          <h3 className="text-black">Teléfono</h3>
          <InputComponent type="readOnly" placeholder="Perez" />
          <h3 className="text-black">Semestre</h3>
          <InputComponent type="readOnly" placeholder="Octavo" />
        </div>
        <div className="Third Row">
          <h3 className="text-black">Pepito</h3>
          <InputComponent type="readOnly" placeholder="Pepito" />
          <h3 className="text-black">Correo Electrónico</h3>
          <InputComponent type="readOnly" placeholder="Perez" />
          <h3 className="text-black">Carrera</h3>
          <InputComponent type="readOnly" placeholder="Calle 134 #35-45" />
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      {/* Actividades */}
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            Actividades
          </h2>
          <h3 className="text-lg text-black ml-4 mt-5 mb-5">
            Descripción de la actividad
          </h3>
        </div>
        <div className="grid grid-flow-col gap-4">
          <div className="grid grid-flow-row ">
            <h4 className="text-md font-bold text-[#9ca3af]">Materia</h4>
            <InputComponent
              type="box"
              placeholder="Materia"
              variant="form-input"
              options={[
                { value: "LM", label: "Logica Matemática" },
                { value: "EP", label: "Estructuración del Pensamiento" },
                { value: "IN", label: "Ingles" },
                { value: "FI", label: "Física 1" },
                { value: "MB", label: "Matemáticas Básicas" },
              ]}
            />
            <CiSquarePlus className="w-8 h-8 text-[#374151]" />
          </div>
          <div className="">
            <TextArea
              showCount
              maxLength={200}
              onChange={(e) => setValue(e.target.value)}
              style={{ height: 80, resize: "none" }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
      {/* Documentos */}
      <div className="ml-2 grid grid-flow-row">
        <h2 className="text-xl font-bold text-black mt-5 mb-5">Incapacidad</h2>
        <div className="flex justify-center items-end ">
          <Button onClick={handleOpenModal} className="w-62 h-12 text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-between items-center">
            Adjuntar Documentos <LuUpload className="ml-2 h-7 w-7" />
          </Button>
        </div>

        <div className="col-span-2">
          <ModalIncapacityComponent
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
                    content="Incapacidad realizada correctamente"
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

export default FormIncapacityComponent;
