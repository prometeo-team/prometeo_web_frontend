import './RequestTypeComponent.css';
import { Col, Row } from 'antd';
import CardComponent from './CardComponent';

// const columns = [
//    "Adición de créditos",
//    "Cancelación de créditos",
//    "Incapacidades Medicas",
//    "Supletorios",
//    "Reintegro",
//    "Reembolso",
//    "Reserva de cupo",
//    "Legalización de matrícula"
// ]

function RequestTypeComponent() {
   return (
      <div className="requestLayout mt-16 ml-12">
         <Row>
            <Col span={4}>
               <CardComponent title="Adición de créditos" icon="1" />
            </Col>
            <Col className='ml-16' span={4}>
               <CardComponent title="Cancelación de créditos" icon="2" />
            </Col>
            <Col className='ml-16' span={4}>
               <CardComponent title="Incapacidades Medicas" icon="3" />
            </Col>
            <Col className='ml-16' span={4}>
               <CardComponent title="Supletorios" icon="4" />
            </Col>
         </Row>
         <Row className='mt-10'>
            <Col span={4}> <CardComponent title="Reintegro" icon="5" /></Col>
            <Col className='ml-16' span={4}> <CardComponent title="Reembolso" icon="6" /></Col>
            <Col className='ml-16' span={4}> <CardComponent title="Reserva de cupo" icon="7" /></Col>
            <Col className='ml-16' span={4}> <CardComponent title="Legalización de matrícula" icon="8" /></Col>
         </Row>
      </div>

   )
}

export default RequestTypeComponent;