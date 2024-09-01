import React, { useEffect, useState } from "react";
import ModalIncapacityComponent from "./ModalIncapacityComponent";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import { Button, Input } from "antd";
import ModalComponent from "./ModalComponent";

const { TextArea } = Input;

const user = sessionStorage.getItem('user');
var info;

const materias = [
  { value: "1", label: "Logica Matemática" },
  { value: "2", label: "Estructuración del Pensamiento" },
  { value: "3", label: "Inglés" },
  { value: "4", label: "Física 1" },
  { value: "5", label: "Matemáticas Básicas" },
];

const FormAddition_CancelComponent = ({type}) => {
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [subjects, setSubjects] = useState([{ id: "subject0" }]); // Estado inicial para las materias
  //const [materias, setMaterias] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    fetchInfo(type);
  }, []);

  const fetchInfo = async (proceses) => {
    console.log(proceses);
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const carrer = params.get('carrera');

    if (carrer) {
      try {
        const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/user/getInformationStudentOverview?username=${user}&career=${carrer}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        if (result.status === "200 OK") {
          setStudentInfo(result.data[0]);
          const programOptions = JSON.stringify(result.data);
          info = JSON.parse(programOptions);
          document.getElementById('document_type').setAttribute('value',info[0].document_type);
          document.getElementById('Last_name').setAttribute('value',info[0].last_name);
          document.getElementById('carrer_input').setAttribute('value',carrer);
          document.getElementById('num_documet').setAttribute('value',info[0].document_number);
          document.getElementById('phone_input').setAttribute('value',info[0].phone);
          document.getElementById('semester_input').setAttribute('value',info[0].semester);
          document.getElementById('email_input').setAttribute('value',info[0].email);
          document.getElementById('address_input').setAttribute('value',info[0].address);
          /*const response2 = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/student/pendingSubjectsByCareer?careerName=Ingeniería de Sistemas&userName=${user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          const result2 = await response2.json();
          if (result2.status === "200 OK") {
            //setear las amterias y validar que los campos + no sena mayorea a la cantidad de materias que se pueden poner o a que sumen 20 los creditos
            const carearrsubjects = result2.data.map(program => ({ value: program.subjects.id, label: program.subjects.name }));
            setMaterias(carearrsubjects);
          } else {
            console.error("Error en la respuesta:", result.message);
          }
          console.log('Programas obtenidos:', info[0]);*/
        } else {
          console.error("Error en la respuesta:", result.message);
        }
      } catch (error) {
        console.error("Error al obtener los programas:", error);
      }
    } else {
      console.error("El parámetro 'carrera' no está presente en la URL");
    }
  };

  const handleOpenModalCheck = () => {
    setModalVisibleCheck(true);
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
  };
  const handleChange = (value) => {
    console.log(value)
  };

  const handlePlusButton = () => {
    const newId = `subject${subjects.length}`; // Genera un ID único para cada nuevo componente
    setSubjects([...subjects, { id: newId }]); // Añade una nueva entrada al estado
  };

  const handleMinusButton = () => {
    if (subjects.length > 1) {
      setSubjects(subjects.slice(0, -1)); // Elimina el último elemento del array
    }
  };

  return (
    <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
      <Link to="/student/crear-solicitud">
        <button className="w-40 h-5 font-bold text-lg flex items-center mb-5 font-color">
          <IoIosArrowBack className="h-7 w-7" />
          <span className="ml-2">Volver</span>
        </button>
      </Link>
      {/* Información del estudiante */}
      <h2 className="text-xl font-bold text-pretty text-black ml-2 mt-5 mb-5">
        Información del estudiante
      </h2>
      <div className="studentInfo_container ml-2 grid grid-cols-3 gap-4">
        <div className="First Row">
          <h3 className="text-black">Tipo de documento</h3>
          <InputComponent id="document_type" type="readOnly" placeholder="Cédula de Ciudadanía" />
          <h3 className="text-black">Apellidos</h3>
          <InputComponent id="Last_name" type="readOnly" placeholder="Perez" />
          <h3 className="text-black">Carrera</h3>
          <InputComponent id="carrer_input" name="carrera" type="readOnly" placeholder="Carrera" />
        </div>
        <div className="Second Row">
          <h3 className="text-black">No. de documento</h3>
          <InputComponent id="num_documet" type="readOnly" placeholder="Cédula de Ciudadanía" />
          <h3 className="text-black">Teléfono</h3>
          <InputComponent id="phone_input" type="readOnly" placeholder="Perez" />
          <h3 className="text-black">Semestre</h3>
          <InputComponent id="semester_input" type="readOnly" placeholder="Octavo" />
        </div>
        <div className="Third Row">
        <h3 className='text-black truncate'>Nombre(s)</h3>
        <InputComponent id="name_input" type="readOnly" variant="form-input" placeholder={studentInfo.name || "Nombre"} value={studentInfo.name || ""} className="w-full" />
          <h3 className="text-black">Correo Electrónico</h3>
          <InputComponent id="email_input" type="readOnly" placeholder="Perez" />
          <h3 className="text-black text-pretty">Carrera</h3>
          <InputComponent id="address_input" type="readOnly" placeholder="Calle 134 #35-45" />
        </div>
      </div>
      <div>
        <div className="w-full border-t border-black"></div>
      </div>
      {/* Actividades */}
      <div className="activity_box ml-2 mb-6">
        <div className="grid grid-flow-col">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            {type}
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <div id="subjects" className="w-1/3 flex flex-col max-md:w-full">
            <h4 className="text-md font-bold text-[#9ca3af]">Materia</h4>
            {subjects.map((subject) => (
              <InputComponent
                key={subject.id} // Asegura que cada InputComponent tenga una key única
                id={subject.id}
                name="subjects"
                type="box"
                placeholder="Materia"
                variant="form-input"
                options={[ ...materias]}
                onChange={handleChange}
              />
            ))}
            <div className="flex flex-row">
            <CiSquarePlus className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handlePlusButton} />
            {subjects.length > 1 && ( // Mostrar el botón de eliminar solo si hay más de un componente
                <CiSquareMinus className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handleMinusButton} />
              )}
              </div>
              <br />
          </div>
          <div className="flex justify-end">
            <button
              className="w-52 h-12 text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-center items-center"
              onClick={handleOpenModalCheck}
            >
              <span>Generar Solicitud</span>
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
      </div>
    </div>
  );
};

export default FormAddition_CancelComponent;
