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

      if (option == 1) {
         console.log('Adición de créditos');

      } if (option == 2) {
         console.log('Cancelación de créditos');

      } if (option == 3) {
         console.log('Incapacidades Medicas');

      } if (option == 4) {
         console.log('Supletorios');

      } if (option == 5) {
         console.log('Reintegro');

      } if (option == 6) {
         console.log('Reembolso');

      } if (option == 7) {
         console.log('Reserva de cupo');

      } if (option == 8) {
         console.log('Legalización de matrícula');

      }
   };

   const returnClick = () => {
      const forms = document.getElementById('forms');
      console.log(forms);
      forms.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
         toggleVisibility();
      }, 600);
   }
   return (
      <>
         {
            isVisible && (<div className="requestLayout mt-16 ml-12" id="options">
               <Row>
                  <Col span={4}>
                     <CardComponent title="Adición de créditos" icon="1" onCardClick={handleCardClick} />
                  </Col>
                  <Col className='ml-16' span={4}>
                     <CardComponent title="Cancelación de créditos" icon="2" onCardClick={handleCardClick} />

                  </Col>
                  <Col className='ml-16' span={4}>
                     <CardComponent title="Incapacidades Medicas" icon="3" onCardClick={handleCardClick} />
                  </Col>
                  <Col className='ml-16' span={4}>
                     <CardComponent title="Supletorios" icon="4" onCardClick={handleCardClick} />
                  </Col>
               </Row>
               <Row className='mt-10'>
                  <Col span={4}> 
                  <Link to="/student/reintegro" onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                           window.location.href = "/student/reintegro";
                        }, 600);
                     }}>
                        <CardComponent title="Reintegro" icon="5" onCardClick={handleCardClick} />
                     </Link>
                  </Col>
                  <Col className='ml-16' span={4}> <CardComponent title="Reembolso" icon="6" onCardClick={handleCardClick} /></Col>
                  <Col className='ml-16' span={4}> <CardComponent title="Reserva de cupo" icon="7" onCardClick={handleCardClick} /></Col>
                  <Col className='ml-16' span={4}>
                     <Link to="/student/legalizacion-matricula" onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                           window.location.href = "/student/legalizacion-matricula";
                        }, 600);
                     }}>
                        <CardComponent title="Legalización de matrícula" icon="8" onCardClick={handleCardClick} />
                     </Link>
                  </Col>

               </Row>
               <FloatButton
                  tooltip={<div>volver</div>}
                  icon={<ArrowLeftOutlined className='iconButtonReturn' />}
                  badge={{ color: 'green' }}
                  href='/'
                  className='button-return'
                  shape='circle'
               />
            </div>)
         }
         {
            !isVisible && (
               <div className="forms" id="forms">

                  <FloatButton
                     tooltip={<div>volver</div>}
                     icon={<ArrowLeftOutlined className='iconButtonReturn' />}
                     badge={{ color: 'green' }}
                     onClick={returnClick}
                     className='button-return'
                     shape='circle'
                  />
               </div>
            )
         }

      </>
   )
}

export default RequestTypeComponent;