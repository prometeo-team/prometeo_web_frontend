import './RequestTypeComponent.css';
import { Col, Row } from 'antd';
import CardComponent from './CardComponent';
import { FloatButton } from 'antd';
import { useState } from 'react';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { Link, useNavigate } from 'react-router-dom';
import ModalAskCarrer from '../components/ModalAskCarrer.jsx';
import Loader from '../components/LoaderComponent.jsx';

function RequestTypeComponent() {
   const [isVisible, setIsVisible] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate();

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   };

   const handleCardClick = (option) => {
      const options = document.getElementById('options');
      options.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
         toggleVisibility();
      }, 600);

      switch (option) {
         case 1:
            console.log('Adición de créditos');
            break;
         case 2:
            console.log('Cancelación de créditos');
            break;
         case 3:
            console.log('Incapacidades Médicas');
            break;
         case 4:
            console.log('Supletorios');
            break;
         case 5:
         case 6:
         case 7:
         case 8:
         case 9:
            console.log('Legalización, Reembolso, Reserva de cupo, Activación de cupo');
            setIsModalOpen(true);
            break;
         default:
            break;
      }
   };

   const handleModalConfirm = () => {
      setIsModalOpen(false);
      navigate('/student/reintegro'); // Navigate to the reintegro page
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

   return (
      <>
         <ModalAskCarrer
            isVisible={isModalOpen}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
         />
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
                        <CardComponent title="Adición de créditos" icon="1" onCardClick={() => handleCardClick(1)} />
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
                        <CardComponent title="Cancelación de créditos" icon="2" onCardClick={() => handleCardClick(2)} />
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
                        <CardComponent title="Incapacidades Médicas" icon="3" onCardClick={() => handleCardClick(3)} />
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
                        <CardComponent title="Activación de cupo" icon="9" onCardClick={() => handleCardClick(8)} />
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
                        <CardComponent title="Postulacion a Grados" icon="10" onCardClick={() => handleCardClick(10)} />
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
                  onClick={returnClick}
               />
            </div>
         )}
      </>
   );
}

export default RequestTypeComponent;
