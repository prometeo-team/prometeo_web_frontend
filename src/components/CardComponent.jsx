import './CardComponent.css';
import { Col, Row } from 'antd';
import { TiDocumentAdd } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdAssignmentReturn } from "react-icons/md"
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiUserSharedFill } from "react-icons/ri";
import { GrDocumentUser } from "react-icons/gr";


// eslint-disable-next-line react/prop-types
function CardComponent({ title, icon }) {
    const size = 120;
    if (icon == 1) {
        icon = <TiDocumentAdd size={size} />;
    } if (icon == 2) {
        icon = <MdOutlineCancel size={size} />;
    } if (icon == 3) {
        icon = <RiHeartsFill size={size} />;
    } if (icon == 4) {
        icon = <HiOutlineDocumentSearch size={size} />;
    } if (icon == 5) {
        icon = <MdAssignmentReturn size={size} />;
    } if (icon == 6) {
        icon = <FaMoneyBillTransfer size={size} />;
    } if (icon == 7) {
        icon = <RiUserSharedFill size={size} />;
    } if (icon == 8) {
        icon = <GrDocumentUser size={size} />;
    }

    return (
        <div className="card">
            <Row>
                <Col span={24} className='flex flex-col items-center mt-6'>
                    <div className="card-title">{icon}</div>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='flex flex-col items-center mt-3'>
                    <div className="card-body">{title}</div>
                </Col>
            </Row>
        </div>
    );
}

export default CardComponent;