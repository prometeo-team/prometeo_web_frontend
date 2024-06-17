import './RequestTypeComponent.css';
import { Col, Row } from 'antd';
import CardComponent from './CardComponent';
import { FloatButton } from 'antd';
import { useState } from 'react';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { Link } from 'react-router-dom';

function RequestTypeComponent() {
   const [isVisible, setIsVisible] = useState(true);

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   };

   const handleCardClick = (option) => {
      const options = document.getElementById('options');
      options.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
         toggleVisibility();
      }, 600);

      if (option === 1) {
         console.log('Adición de créditos');
      } else if (option === 2) {
         console.log('Cancelación de créditos');
      } else if (option === 3) {
         console.log('Incapacidades Medicas');
      } else if (option === 4) {
         console.log('Supletorios');
      } else if (option === 5) {
         console.log('Reintegro');
      } else if (option === 6) {
         console.log('Reembolso');
      } else if (option === 7) {
         console.log('Reserva de cupo');
      } else if (option === 8) {
         console.log('Acticacion de cupo');
      } else if (option === 9) {
         console.log('Legalización de matrícula');
      }
   };

   const returnClick = () => {
      const forms = document.getElementById('forms');
      forms.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
         toggleVisibility();
      }, 600);
   };

   return (
      <>
         {isVisible && (
            <div className="requestLayout mt-16 ml-12" id="options">
               <Row gutter={[16, 16]} justify="center">
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-adicion"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/solicitud-adicion";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Adición de créditos" icon="1" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-cancelacion"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/solicitud-cancelacion";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Cancelación de créditos" icon="2" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-incapacidad"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/solicitud-incapacidad";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Incapacidades Médicas" icon="3" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/solicitud-supletorio"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/solicitud-supletorio";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Supletorios" icon="4" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/reintegro"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/reintegro";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Reintegro" icon="5" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <CardComponent title="Reembolso" icon="6" onCardClick={handleCardClick} />
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <CardComponent title="Activación de cupo" icon="9" onCardClick={handleCardClick} />
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <CardComponent title="Reserva de cupo" icon="7" onCardClick={handleCardClick} />
                  </Col>
                  <Col className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/legalizacion-matricula"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/legalizacion-matricula";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Legalización de matrícula" icon="8" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col id='postulacionG' className="card-col" xs={24} sm={12} md={8} lg={6}>
                     <Link
                        to="/student/postulacion-grado"
                        onClick={(e) => {
                           e.preventDefault();
                           setTimeout(() => {
                              window.location.href = "/student/postulacion-grado";
                           }, 600);
                        }}
                     >
                        <CardComponent title="Postulacion a Grados" icon="10" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  
                  
               </Row>
               <FloatButton
                  tooltip={<div>volver</div>}
                  icon={<ArrowLeftOutlined className="iconButtonReturn" />}
                  badge={{ color: 'green' }}
                  href="/"
                  className="button-return"
                  shape="circle"
               />
            </div>
         )}
         {!isVisible && (
            <div className="forms" id="forms">
               <FloatButton
                  tooltip={<div>volver</div>}
                  icon={<ArrowLeftOutlined className="iconButtonReturn" />}
                  badge={{ color: 'green' }}
                  onClick={returnClick}
                  className="button-return"
                  shape="circle"
               />
            </div>
         )}
      </>
   );   
}

export default RequestTypeComponent;
