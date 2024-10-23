import './RequestTypeComponent.css';
import { Col, Row } from 'antd';
import CardComponent from './CardComponent';
import { FloatButton,Modal } from 'antd';
import { useState, useEffect } from 'react';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { Link, useNavigate } from 'react-router-dom';
import ModalAskCarrer from '../components/ModalAskCarrer.jsx';
import { elements } from 'chart.js';
const user = sessionStorage.getItem('user');
var where = "";
function RequestTypeComponent() {
   const [role, setRole] = useState(null);
   const [isVisible, setIsVisible] = useState(true);
   const [isVisibleDegree, setIsVisibleDegree] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ModalVisible, setisModalVisible] = useState(false);
   const [visibleAdicionCreditos, setVisibleAdicionCreditos] = useState(false);
   const [visibleRetiroCreditos, setVisibleRetiroCreditos] = useState(false);
   const [CardProcess, setCardProcess] = useState(null);
   const [Degree, setDegree] = useState([]);
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
            setRole('ROLE_STUDENT');
          } else if (decodedToken.authorities.includes('ROLE_ADMIN')) {
            setRole('ROLE_ADMIN');
          }else if (decodedToken.authorities.includes('ROLE_TEACHER')) {
            setRole('ROLE_TEACHER');
          }else if (decodedToken.authorities.includes('ROLE_ACADEMIC')) {
            setRole('ROLE_ACADEMIC');
          }else if (decodedToken.authorities.includes('ROLE_SUBACADEMIC')) {
            setRole('ROLE_SUBACADEMIC');
          }else if (decodedToken.authorities.includes('ROLE_COORDINADORPRE')) {
            setRole('ROLE_COORDINADORPRE');
          }else if (decodedToken.authorities.includes('ROLE_COORDINADORPOS')) {
            setRole('ROLE_COORDINADORPOS');
          }else if (decodedToken.authorities.includes('ROLE_DECANO')) {
            setRole('ROLE_DECANO');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      fetchdegre();
      fetchdegreAvailable();
    }, []);

    const fetchdegre = async () =>{
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/degreeApplicationByUser?username=${user}`, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${sessionStorage.getItem('token')}`,
           },
         });
         
         const result = await response.json();
         if(response.status===200){
            setIsVisibleDegree(true);
            const prevDegree = result.map(subjet =>subjet.title.split(" - ")[1]);
             
            setDegree(prevDegree);
         }
      }catch(error){
         console.error("Error al obtener los datos:", error);
      }
   }

   const fetchdegreAvailable = async () =>{
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/requestType/requestsAvailable`, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${sessionStorage.getItem('token')}`,
           },
         });
         
         const result = await response.json();
         if(response.ok){
             
            const adicionCreditos = result.data[6]["Adición de créditos"];
            const retiroCreditos = result.data[7]["Retiro de créditos"];

            setVisibleAdicionCreditos(adicionCreditos);
            setVisibleRetiroCreditos(retiroCreditos);

         }
      }catch(error){
         console.error("Error al obtener los datos:", error);
      }
   }

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   };


   const handleCardClick = (option) => {
      
      switch (option) {
         case 1:
            setCardProcess('Adición de créditos');
            if(!visibleAdicionCreditos){
               setisModalVisible(true);
               where = '/student/solicitud-adicion';
            }else{
               setIsModalOpen(true);
               where = '/student/solicitud-adicion';
            }
            break;
         case 2:
            setCardProcess('Retiro de créditos');
            if(!visibleRetiroCreditos){
               setisModalVisible(true);
               where="/student/solicitud-cancelacion";
            }else{
               setIsModalOpen(true);
               where="/student/solicitud-cancelacion";
            }
            break;
         case 3:
            setCardProcess('Incapacidades Estudiantes');
            setIsModalOpen(true);
            where="/student/solicitud-incapacidad";
             
            break;
         case 4:
            setCardProcess('Supletorios');
            setIsModalOpen(true);
            where="/student/solicitud-supletorio";
             
            break;
         case 5:
            setCardProcess('Reintegro');
            setIsModalOpen(true);
            where="/student/reintegro";
            break;
         case 6:
            setCardProcess('Reembolso');
            setIsModalOpen(true);
            where="/student/reembolso";
            break;
         case 7:
            setCardProcess('Reserva de cupo');
            setIsModalOpen(true);
            where="/student/reserva";
            break;
         case 8:
            setCardProcess('Activación de cupo');
            setIsModalOpen(true);
            where="/student/activacion-cupo";
            break;
         case 9:
            setCardProcess('Legalización de matrícula');
            setIsModalOpen(true);
            where="/student/legalizacion-matricula";
            break;
         case 10:
            setCardProcess('Postulación a grados');
            setIsModalOpen(true);
            where="/student/Postulacion-grado";
            break;
         default:
            break;
      }
   };

   const handleModalConfirm = () => {
      var carrera = document.getElementById('carrer_select').value;
      sessionStorage.setItem('Carrera', carrera);
      setIsModalOpen(false);
      navigate(where+'?carrera='+carrera); // Navigate to the reintegro page
   };
   

   const handleModalCancel = () => {
      setIsModalOpen(false);
   };

   const returnClick = () => {
      const forms = document.getElementById('forms');
      forms.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
         toggleVisibility();
      }, 600);
   };

   const closeModal = () => {
      setisModalVisible(false);
      setIsModalOpen(true);
   };
   const cancelModal = () => {
      setisModalVisible(false);
   };

   return (
      <>
         <ModalAskCarrer
            isVisible={isModalOpen}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            process ={CardProcess}
            degreePrograms={Degree}
         />
         {isVisible && (
            <div className="requestLayout mt-16 ml-12" id="options">
               {role=="ROLE_STUDENT" && (
               <Row gutter={[16, 16]} justify="center">
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-adicion"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(1);
                        }}
                     >
                        <CardComponent title="Adición de créditos" icon="1" onCardClick={() => handleCardClick(1)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-cancelacion"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(2);
                        }}
                     >
                        <CardComponent title="Retiro de créditos" icon="2" onCardClick={() => handleCardClick(2)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-incapacidad"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(3);
                        }}
                     >
                        <CardComponent title="Incapacidades Médicas" icon="3" onCardClick={() => handleCardClick(3)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-supletorio"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(4);
                        }}
                     >
                        <CardComponent title="Supletorios" icon="4" onCardClick={() => handleCardClick(4)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/reintegro"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(5);
                        }}
                     >
                        <CardComponent title="Reintegro" icon="5" onCardClick={() => handleCardClick(5)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/reembolso"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(6);
                        }}
                     >
                        <CardComponent title="Reembolso" icon="6" onCardClick={() => handleCardClick(6)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/activacion-cupo"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(8);
                        }}
                     >
                        <CardComponent title="Activación reserva de cupo" icon="9" onCardClick={() => handleCardClick(8)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/reserva"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(7);
                        }}
                     >
                        <CardComponent title="Reserva de cupo" icon="7" onCardClick={() => handleCardClick(7)} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/legalizacion-matricula"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(9);
                        }}
                     >
                        <CardComponent title="Legalización de matrícula" icon="8" onCardClick={() => handleCardClick(9)} />
                     </Link>
                  </Col>
                  {isVisibleDegree  &&(
                  <Col id='PostulaciónG' className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/Postulación-grado"
                        onClick={(e) => {
                           e.preventDefault();
                           handleCardClick(10);
                        }}
                     >
                        <CardComponent title="Postulación a grados" icon="10" onCardClick={() => handleCardClick(10)} />
                     </Link>
                  </Col>
                  )}
               </Row>
               )}
               {role=="ROLE_TEACHER" && (
               <Row gutter={[16, 16]} justify="center">
                  {visibleIncapacidadesDocentes &&(
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/teacher/solicitud-incapacidad"
                        onClick={(e) => {
                           navigate('/teacher/solicitud-incapacidad');
                        }}
                     >
                        <CardComponent title="Incapacidades Médicas" icon="3" onCardClick={() => handleCardClick(3)} />
                     </Link>
                  </Col>
                  )}
               </Row>
               )}
               <FloatButton
                  tooltip={<div>volver</div>}
                  icon={<ArrowLeftOutlined className="iconButtonReturn" />}
                  badge={{ color: 'green' }}
                  href="/"
                  className="button-return"
                  shape="circle"
                  onClick={returnClick}
               />
               <Modal
                  title="Solicitud fuera de tiempo"
                  open={ModalVisible}
                  onOk={closeModal}
                  onCancel={cancelModal}
                  >
                  <div>
                     <p>
                        Tenga en cuenta que se realizara la solicitud de manera extemporanea
                     </p>
                  </div>
                  
               </Modal>
            </div>
         )}
      </>
   );
}

export default RequestTypeComponent;
