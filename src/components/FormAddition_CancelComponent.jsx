import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import {Spin}  from "antd";
import InputComponent from "./InputComponent";
import ModalComponent from "./ModalComponent";
import './FormLegalizationComponent.css';

const user = sessionStorage.getItem('user');

let career;
var credits = 0;
var txtcredits = '';
var text = '';
const FormAddition_CancelComponent = ({type}) => {
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [subjects, setSubjects] = useState([{ id: "subject0", disabled: false }]); // Estado inicial para las materias
  const [materias, setMaterias] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [newCredits, setNewCredits] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if(type=="Adición de creditos"){
    text =`*El estudiante podrá sobre acreditarse hasta por un 20% adicional a la carga máxima de créditos establecida para el periodo. `;
    txtcredits = `Cantidad de créditos : ${credits}`;
  }else if(type == "Cancelación de creditos"){
    text =`*El estudiante podrá presentar una solicitud de retiro de uno o más créditos antes de transcurrido el 10% del periodo académico en curso. La cancelación de asignaturas
            no genera reembolso alguno.`;
    txtcredits = '';
  }
  useEffect(() => {
    fetchInfo(type);
  }, []);

  const fetchInfo = async (proceses) => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    career=params.get('carrera');
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
          if(proceses=="Adición de creditos"){
            adicion();
          }else if(proceses=="Cancelación de creditos"){
            cancelacion();
          }
        }else {
          console.error("Error en la respuesta:", result.message);
        }
      } catch (error) {
        console.error("Error al obtener los programas:", error);
      }
    }else {
      console.error("El parámetro 'carrera' no está presente en la URL");
    }
  };

  const fetchRequest = async (request) => {
    try {
      const response = await  fetch(`${import.meta.env.VITE_API_URL}/request/uploadAndCreateRequest`, request)
      const result = await response.json();
          if (result.status === "200 OK") {
            setModalVisibleCheck(true);
          } else {
            console.error("Error en la respuesta:", result.message);
          }
      } catch (error) {
          console.error("Error al obtener los programas:", error);
      }
  }

  const adicion = async () =>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student/pendingSubjectsByCareer?careerName=${career}&userName=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.status===200 ) {
        credits = parseInt(result.data.totalEnrolledCredits);
        const carearrsubjects = result.data.subjects.map(program => ({ key: program.credits, value: program.id, label: program.name }));
        setMaterias(carearrsubjects);
      }else {
        console.error("Error en la respuesta:", result.message);
      }
      setIsButtonVisible(false);
      
    }catch(error){
      console.error("Error al obtener los programas:", error);
    }
  }

  const cancelacion = async () =>{
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

        setMaterias(carearrsubjects);
      }else {
        console.error("Error en la respuesta:", result.message);
      }
      setIsButtonVisible(false);
    }catch(error){
      console.error("Error al obtener los programas:", error);
    }
  }

  const handleOpenModalCheck = () => {
    setIsButtonVisible2(false);
    setLoading(true);
    if(type=="Adición de creditos"){
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
      const formdata = new FormData();
      const subjectList = newCredits.map(credit => ({
        id_subject: credit.id_subject,
        subject_name: credit.subject_name
      }));
      const requestJson = new Blob([JSON.stringify({
        userEntity: user,
        requestTypeEntity: 'Adición de Créditos',
        programStudent: career,
        subjectList: subjectList
      })], { type: 'application/json' });
      formdata.append("request", requestJson);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      fetchRequest(requestOptions);
    } else if(type=="Cancelación de creditos"){
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
      const formdata = new FormData();
      const subjectList = newCredits.map(credit => ({
        id_subject: credit.id_subject,
        subject_name: credit.subject_name
      }));
      const requestJson = new Blob([JSON.stringify({
        userEntity: user,
        requestTypeEntity: 'Retiro de Créditos',
        programStudent: career,
        subjectList: subjectList
      })], { type: 'application/json' });
      formdata.append("request", requestJson);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      fetchRequest(requestOptions);
    }
  };

  const handleCloseModalCheck = () => {
    setModalVisibleCheck(false);
    navigate("/student/mis-solicitudes");
  };

  const handleChange = (option) => {
    if (type == "Adición de creditos") {
      setIsButtonVisible2(true);
      if (option && option.selectedOption) {
        const selectedCredits = parseInt(option.selectedOption.key, 10);
        const id = option.target.id;
        const id_subject = option.selectedOption.value;
        const label = option.selectedOption.label;
        if(credits+selectedCredits<=20){
          const index = newCredits.findIndex(credit => credit.id === id);
          if (index!=-1) {
            credits= credits-newCredits[index].credits;
            setNewCredits((prevCredits) =>
              prevCredits.map((subject) =>
                subject.id === id
                ?{...subject, credits: selectedCredits, id_subject: id_subject, subject_name: label}
                :subject
              )
            );
            credits=credits+selectedCredits;
          }else{
            credits=credits+selectedCredits;
            setNewCredits([...newCredits, {id: id, credits: selectedCredits, id_subject: id_subject, subject_name: label}]);
          }
            setIsButtonVisible(credits<20);
        }
        
      } else {
        console.warn('selectedOption is undefined:', option);
      }
    } else if (type == "Cancelación de creditos") {
      setIsButtonVisible2(true);
      setIsButtonVisible(true);
      if (option && option.selectedOption) {
        const id = option.target.id;
        const id_subject = option.selectedOption.value;
        const label = option.selectedOption.label;
        const index = newCredits.findIndex(credit => credit.id === id);
          if (index!=-1) {
            credits= credits-newCredits[index].credits;
            setNewCredits((prevCredits) =>
              prevCredits.map((subject) =>
                subject.id === id
                ?{...subject, id_subject: id_subject, subject_name: label}
                :subject
              )
            );
          }else{
            setNewCredits([...newCredits, {id: id, id_subject: id_subject, subject_name: label}]);
          }
      }
    }
  };

  const handlePlusButton = () => {
    if(subjects.length<materias.length){
      const newId = `subject${subjects.length}`; // Genera un ID único para cada nuevo componente
      setSubjects([...subjects, { id: newId, disabled: false}]); // Añade una nueva entrada al estado
      if(type=="Adición de creditos"){
        const id = `subject${subjects.length-1}`;
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
        const creditLimit = 20 - credits;
        
        setMaterias(prevMaterias =>
          prevMaterias.map(materia =>
            parseInt(materia.key, 10) > creditLimit
              ? { ...materia, disabled: true }
              : materia
          )
        );
        setIsButtonVisible(false);
      }else if(type=="Cancelación de creditos"){
        const id = `subject${subjects.length-1}`;
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
    }
  };

  const handleMinusButton = () => {
    if (subjects.length > 1) {
      if(type=="Adición de creditos"){
        console.log('entro');
        const id = `subject${subjects.length-1}`;
        const index = newCredits.findIndex(credit => credit.id === id);
          console.log(index);
          if (index!=-1) {
              credits = credits-newCredits[index].credits;
              newCredits.splice(index,1);  
          }
          const id2 = `subject${subjects.length-2}`;
          const index2 = newCredits.findIndex(credit => credit.id === id2);
          console.log("creditos: "+(credits-newCredits[index2].credits))
          const creditLimit = 20 - (credits - newCredits[index2].credits);
          console.log("limite: "+creditLimit)
              setMaterias(prevMaterias =>
                prevMaterias.map(materia =>
                  parseInt(materia.key, 10) > creditLimit
                    ? { ...materia, disabled: true }
                    : { ...materia, disabled: false }
                )
              );
          console.log("id menos"+id);
          for (let index = 0; index < (subjects.length-2); index++) {
            const id = `subject${index}`;
            console.log("ciclo: "+id);
            const indexC = newCredits.findIndex(credit => credit.id === id);
            const BMateria =newCredits[indexC].id_subject;
            console.log("BMateria: "+BMateria);
            const indexM = materias.findIndex(subject => subject.value === BMateria);
            materias[indexM].disabled=true;
          }
          
          const indexC = newCredits.findIndex(credit => credit.id === id2);
          const BMateria = newCredits[indexC].id_subject;
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
          setIsButtonVisible(true);
      }else if(type=="Cancelación de creditos"){
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
      console.log(subjects); // Elimina el último elemento del array
    }
  };

  return (
    <div className='reserva-container bg-white p-4 rounded-lg shadow-md m-5 warp margenL'>
      <Link to="/student/crear-solicitud">
        <button className="w-40 h-5 font-bold text-lg flex items-center mb-5 font-color">
          <IoIosArrowBack className="h-7 w-7" />
          <span className="ml-2">Volver</span>
        </button>
      </Link>
      {/* Información del estudiante */}
      <h2 className="text-xl font-bold text-black truncate mt-5 mb-5">Información del estudiante</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full max-w-xs">
              <h3 className='text-black truncate'>Nombre(s)</h3>
              <InputComponent id="name_input" type="readOnly" variant="form-input" placeholder={studentInfo.name || "Nombre"} value={studentInfo.name || ""} className="w-full" />
              <h3 className='text-black truncate mt-2'>Tipo de documento</h3>
              <InputComponent id="documente_type" type="readOnly" variant="form-input" placeholder={studentInfo.document_type || "Tipo de documento"} value={studentInfo.document_type || ""} className="w-full" />
              <h3 className='text-black truncate mt-2'>Carrera</h3>
              <InputComponent id="cumulative_average_input" type="readOnly" variant="form-input" placeholder={career || "Carrera"} value={career || ""} className="w-full" />
          </div>
          <div className="w-full max-w-xs">
              <h3 className="text-black truncate">Apellidos</h3>
              <InputComponent id="last_name_input" type="readOnly" variant="form-input" placeholder={studentInfo.last_name || "Apellidos"} value={studentInfo.last_name || ""} className="w-full" />
              <h3 className="text-black truncate mt-2">No. de documento</h3>
              <InputComponent id="admission_date_input" type="readOnly" variant="form-input" placeholder={studentInfo.document_number || "No. de documento"} value={studentInfo.document_number || ""} className="w-full" />
              <h3 className="text-black truncate mt-2">Dirección</h3>
              <InputComponent id="academic_loss_input" type="readOnly" variant="form-input" placeholder={studentInfo.address || "Cantidad"} value={studentInfo.address || ""} className="w-full" />
          </div>
          <div className="w-full max-w-xs">
              <h3 className='text-black truncate'>Teléfono</h3>
              <InputComponent id="schedule_input" type="readOnly" variant="form-input" placeholder={studentInfo.phone || "Jornada"} value={studentInfo.phone || ""} className="w-full" />
              <h3 className='text-black truncate mt-2'>Semestre</h3>
              <InputComponent id="semester_input" type="readOnly" variant="form-input" placeholder={studentInfo.semester || "Semestre"} value={studentInfo.semester || ""} className="w-full" />
              <h3 className='text-black truncate mt-2'>Correo electrónico</h3>
              <InputComponent id="career_input" type="readOnly" variant="form-input" placeholder={studentInfo.email + "@unbosque.edu.co" || "Programa académico"} value={studentInfo.email + "@unbosque.edu.co" || ""} className="w-full" />
          </div>
        </div>
      <div>
        <div className="w-full border-t border-black"></div>
      </div>
      {/* Actividades */}
      <div className="activity_box ml-2 mb-6">
        <div className="">
          <h2 className="text-xl font-bold text-black mt-5 mb-5">
            {type}
          </h2>
          <h3 className="text-base font-semibold text-black truncate">{txtcredits}</h3>
          <h3 className="text-base text-wrap font-semibold text-red-500 truncate">{text}</h3>
        </div>
        <div className="flex w-full flex-col">
          <div id="subjects" className="w-1/3 flex flex-col max-md:w-full">
            <h4 className="text-md font-bold text-[#9ca3af]">Materia</h4>
            {subjects.map((subject) => (
              <InputComponent
                key={subject.id} // Asegura que cada InputComponent tenga una key única
                id={subject.id}
                name="subjects"
                type="box2"
                placeholder="Materia"
                variant="form-input"
                options={[ ...materias]}
                onChange={handleChange}
                disabled={subject.disabled}
              />
            ))}
            <div className="flex flex-row">
              {isButtonVisible && (
              <CiSquarePlus id="pulsbutton" className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handlePlusButton} />
              )}
              {subjects.length > 1 && ( // Mostrar el botón de eliminar solo si hay más de un componente
                <CiSquareMinus className="w-8 h-8 text-[#374151] cursor-pointer" onClick={handleMinusButton} />
              )}
            </div>
            <br />
          </div>
          <div className="flex justify-end">
          {isButtonVisible2 && (
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
