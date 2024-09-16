import React, { useEffect, useState } from "react";
import ModalIncapacityComponent from "../components/ModalIncapacityComponent";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import { Button, Input, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import ModalComponent from "./ModalComponent";

const user = sessionStorage.getItem('user');
let career;
const { TextArea } = Input;

const FormIncapacityComponent = () => {
  const [role, setRole] = useState(null);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [subjects, setSubjects] = useState([{ id: "subject0", idtxt: "subject0_txt", disabled: false }]); // 1Estado inicial para las materias
  const [materias, setMaterias] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [newCredits, setNewCredits] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        if (decodedToken.authorities.includes('ROLE_STUDENT')) {
          console.log('ROLE_STUDENT');
          setRole('ROLE_STUDENT');
        } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
          console.log('ROLE_ADMIN');
          setRole('ROLE_ADMIN');
        }else if (decodedToken.authorities.includes('ROLE_TEACHER')) {
          console.log('ROLE_TEACHER');
          setRole('ROLE_TEACHER');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
      fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    career = params.get('carrera');
    if (career) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getInformationStudentOverview?username=${user}&career=${career}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        const result = await response.json();
        if (result.status === "200 OK") {
          setStudentInfo(result.data[0]);
          Program();
        } else {
            console.error("Error en la respuesta:", result.message);
        }
    } catch (error) {
        console.error("Error al obtener los programas:", error);
    }
  }else {
    console.error("El parámetro 'carrera' no está presente en la URL");
  }
  };

  const Program = async () =>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student/subjectsByCareer?careerName=${career}&userName=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.status===200 ) {
        const carearrsubjects = result.data.subjects.map(program => ({ value: program.id, label: program.name, disabled: false  }));
        console.log(carearrsubjects);
        setMaterias(carearrsubjects);
      }else {
        console.error("Error en la respuesta:", result.message);
      }
      setIsButtonVisible(false);
    }catch(error){
      console.error("Error al obtener los programas:", error);
    }
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModalCheck = () => {
    setIsButtonVisible2(false);
    setLoading(true);
    if(role=='ROLE_STUDENT'){
      fetchSave();
    }
    if(role=='ROLE_TEACHER'){
      fetchSave2();
    }
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
    if(role=='ROLE_STUDENT'){
      navigate("/student/mis-solicitudes");
    } else if(role=='ROLE_TEACHER'){
      navigate("/teacher/mis-solicitudes");
    }
  };

  const handleChange = (option) => {
    setIsButtonVisible2(true);
    setIsButtonVisible(true);
    if (option && option.selectedOption) {
      const id = option.target.id;
      const idtxt = option.target.id+'_txt';
      const id_subject = option.selectedOption.value;
      const label = option.selectedOption.label;
      const index = newCredits.findIndex(credit => credit.id === id);
        if (index!=-1) {
          setNewCredits((prevCredits) =>
            prevCredits.map((subject) =>
              subject.id === id
              ?{...subject, id_subject: id_subject, subject_name: label}
              :subject
            )
          );
        }else{
          console.log("no existe");
          setNewCredits([...newCredits, {id: id, idtxt: idtxt, id_subject: id_subject, subject_name: label, txt: ''}]);
        }
    }
  };
  
  const handlePlusButton = () => {
    if(subjects.length<materias.length){
      const newId = `subject${subjects.length}`;
      const newIdText = `subject${subjects.length}_txt`; // Genera un ID único para cada nuevo componente
      console.log("nuevo id: "+newId);
      setSubjects([...subjects, { id: newId, idtxt: newIdText, disabled: false}]); // Añade una nueva entrada al estado
      const id = `subject${subjects.length-1}`;
      
      console.log("id adicion "+id);
      setSubjects((prevSub) =>
        prevSub.map((subject) =>
          subject.id === id
          ?{...subject, disabled: true}
          :subject
        )
      );
      const indexC = newCredits.findIndex(credit => credit.id === id);
      const BMateria =newCredits[indexC].id_subject;
      const indexM = materias.findIndex(subject => subject.value === BMateria);
      materias[indexM].disabled=true;
    }
    setIsButtonVisible2(true)
  };

  const handleMinusButton = () => {
    if (subjects.length > 1) {
      const id = `subject${subjects.length-1}`;
      const index = newCredits.findIndex(credit => credit.id === id);
      console.log(index);
      if (index!=-1) {
          newCredits.splice(index,1);  
      }
      const id2 = `subject${subjects.length-2}`;
      const index2 = newCredits.findIndex(credit => credit.id === id2);
      const BMateria = newCredits[index2].id_subject;
      const indexM = materias.findIndex(subject => subject.value === BMateria);
      materias[indexM].disabled=false;

      setSubjects(prevSubjects => {
        // Deshabilita las materias actuales menos el último
        const updatedSubjects = prevSubjects.map((subject, index) =>
          index === prevSubjects.length - 1
            ? { ...subject, disabled: false }
            : subject
        );
        // Habilita la materia que estaba deshabilitada antes
        const prevId = `subject${subjects.length - 2}`;
        return updatedSubjects.slice(0, -1).map(subject =>
          subject.id === prevId
            ? { ...subject, disabled: false }
            : subject
        );
      });
    }
  };

  const handelText = (id, text) =>{
    const index = newCredits.findIndex(credit => credit.idtxt === id);
    const idM = id.split("_")[0];
    console.log(idM)
    if (index!=-1) {
      setNewCredits((prevCredits) =>
        prevCredits.map((subject) =>
          subject.idtxt === id
          ?{...subject, txt: text}
          :subject
        )
      );
    }else{
      console.log("no existe");
      setNewCredits([...newCredits, {id: idM, idtxt: id, id_subject: null, subject_name: null, txt: text}]);
    }
  };

  const fetchSave = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
      const formdata = new FormData();
      const subjectList = newCredits.map(credit => ({
        id_subject: credit.id_subject,
        subject_name: credit.subject_name,
        detail: credit.txt
      }));
      const requestJson = new Blob([JSON.stringify({
        userEntity: user,
        requestTypeEntity: 'Incapacidades Estudiantes',
        programStudent: career,
        subjectList: subjectList
      })], { type: 'application/json' });

      formdata.append("request", requestJson);

      if (documents.length > 0) {
        console.log(documents);
        documents.forEach((file) => {
          formdata.append("files", file.originalfile);
        });
      }
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };


    try {
    const response = await  fetch(`${import.meta.env.VITE_API_URL}/request/uploadAndCreateRequest`, requestOptions)
    const result = await response.json();
        if (result.status === "200 OK") {
          setModalVisibleCheck(true);
        } else {
          console.error("Error en la respuesta:", result.message);
        }
    } catch (error) {
        console.error("Error al obtener los programas:", error);
    }
  };

  const fetchSave2 = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
    const formdata = new FormData();
    
    const requestJson = new Blob([JSON.stringify({
      userEntity: user,
      requestTypeEntity: 'Incapacidades Docentes',
      programStudent: 'Docentes',
    })], { type: 'application/json' });

    formdata.append("request", requestJson);

    if (documents.length > 0) {
      console.log(documents);
      documents.forEach((file) => {
        formdata.append("files", file.originalfile);
      });
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };


  try {
  const response = await  fetch(`${import.meta.env.VITE_API_URL}/request/uploadAndCreateRequest`, requestOptions)
  const result = await response.json();
      if (result.status === "200 OK") {
        setModalVisibleCheck(true);
      } else {
        console.error("Error en la respuesta:", result.message);
      }
  } catch (error) {
      console.error("Error al obtener los programas:", error);
  }
};

  return (
    <div className="h-auto bg-white p-4 rounded-lg shadow-md m-5">
      {role == "ROLE_STUDENT" &&(
      <Link to="/student/crear-solicitud">
        <button className="w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color">
          <IoIosArrowBack className=" h-7 w-7" />
          <span className="ml-2">Volver</span>
        </button>
      </Link>
       )}
       {role == "ROLE_TEACHER" &&(
      <Link to="/teacher/crear-solicitud">
        <button className="w-40 h-5 font-bold text-lg flex  items-center mb-5 font-color">
          <IoIosArrowBack className=" h-7 w-7" />
          <span className="ml-2">Volver</span>
        </button>
      </Link>
       )}
      {/* Información del estudiante */}
      {role == "ROLE_STUDENT" &&(
      <h2 className="text-xl font-bold text-black ml-2 mt-5 mb-5">
        Información del estudiante
      </h2>
       )}
       {role == "ROLE_STUDENT" &&(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="w-full max-w-xs">
          <h3 className='text-black truncate'>Nombre(s)</h3>
          <InputComponent id="name_input" type="readOnly" variant="form-input" placeholder={studentInfo.name || "Nombre"} value={studentInfo.name || ""} className="w-full" />
          <h3 className='text-black truncate mt-2'>Tipo de documento</h3>
          <InputComponent id="documente_type" type="readOnly" variant="form-input" placeholder={studentInfo.document_type || "Tipo de documento"} value={studentInfo.document_type || ""} className="w-full" />
          {role == "ROLE_STUDENT" &&(
          <h3 className='text-black truncate mt-2'>Carrera</h3>
          )}
          {role == "ROLE_STUDENT" &&(
          <InputComponent id="cumulative_average_input" type="readOnly" variant="form-input" placeholder={career || "Carrera"} value={career || ""} className="w-full" />
          )}
        </div>
        <div className="w-full max-w-xs">
          <h3 className="text-black truncate">Apellidos</h3>
          <InputComponent id="last_name_input" type="readOnly" variant="form-input" placeholder={studentInfo.last_name || "Apellidos"} value={studentInfo.last_name || ""} className="w-full" />
          <h3 className="text-black truncate mt-2">No. de documento</h3>
          <InputComponent id="admission_date_input" type="readOnly" variant="form-input" placeholder={studentInfo.document_number || "No. de documento"} value={studentInfo.document_number || ""} className="w-full" />
          {role == "ROLE_STUDENT" &&(
          <h3 className="text-black truncate mt-2">Dirección</h3>
          )}
            {role == "ROLE_STUDENT" &&(
          <InputComponent id="academic_loss_input" type="readOnly" variant="form-input" placeholder={studentInfo.address || "Cantidad"} value={studentInfo.address || ""} className="w-full" />
          )}
        </div>
        <div className="w-full max-w-xs">
            <h3 className='text-black truncate'>Teléfono</h3>
            <InputComponent id="schedule_input" type="readOnly" variant="form-input" placeholder={studentInfo.phone || "Jornada"} value={studentInfo.phone || ""} className="w-full" />
            {role == "ROLE_STUDENT" &&(
            <h3 className='text-black truncate mt-2'>Semestre</h3>
          )} {role == "ROLE_STUDENT" &&(
            <InputComponent id="semester_input" type="readOnly" variant="form-input" placeholder={studentInfo.semester || "Semestre"} value={studentInfo.semester || ""} className="w-full" />
          )} {role == "ROLE_STUDENT" &&(
            <h3 className='text-black truncate mt-2'>Correo electrónico</h3>
          )} {role == "ROLE_STUDENT" &&(
            <InputComponent id="career_input" type="readOnly" variant="form-input" placeholder={studentInfo.email + "@unbosque.edu.co" || "Programa académico"} value={studentInfo.email + "@unbosque.edu.co" || ""} className="w-full" />
          )}
            </div>
      </div>
       )}
      {role == "ROLE_STUDENT" &&(
      <div>
        <div className="w-full border-t border-black "></div>
      </div>
       )}
      {/* Actividades */}
      {role == "ROLE_STUDENT" &&(
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
            <div className="flex justify-center items-center flex-col w-full">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex justify-center items-center w-full mb-4">
                  <div className="w-3/4 p-1">
                    <InputComponent
                      id={subject.id}
                      name="subjects"
                      type="box2"
                      placeholder="Materia"
                      variant="form-input"
                      options={[...materias]}
                      onChange={handleChange}
                      disabled={subject.disabled}
                    />
                  </div>
                  <div className="w-11/12">
                    <TextArea
                      id={subject.idtxt}
                      showCount
                      maxLength={200}
                      onChange={(e) => handelText(subject.idtxt,e.target.value)}
                      style={{ height: 80, resize: "none" }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-center items-center">
                {isButtonVisible && (
                  <CiSquarePlus className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handlePlusButton} />
                )}
                {subjects.length > 1 && (
                  <CiSquareMinus className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handleMinusButton} />
                )}
              </div>
            </div>          
          </div>
        </div>
      </div>
       )}
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
                  {(isButtonVisible2 || role=='ROLE_TEACHER') && (
                  <button
                    className="w-52 h-12 text-white rounded-lg shadow-md color-button font-semibold text-lg flex justify-center items-center"
                    onClick={handleOpenModalCheck}
                  >
                    <span>Generar Solicitud</span>
                    <BsPersonFillCheck className="ml-2 h-5 w-6" />
                  </button>
                  )}
                  {loading  && (
                    <div className="loader-container">
                      <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </div>
                  )}
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
