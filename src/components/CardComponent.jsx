import './CardComponent.css';
import { Col, Row } from 'antd';
import { TiDocumentAdd } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdAssignmentReturn , MdOutlineSchool } from "react-icons/md"
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiUserSharedFill } from "react-icons/ri";
import { GrDocumentUser } from "react-icons/gr";
import { BsFillPersonPlusFill } from "react-icons/bs";


// eslint-disable-next-line react/prop-types
function CardComponent({ title, icon, onCardClick  }) {
    const index = icon; 
    const size = 120;
    if (icon == 1) {
        icon = <TiDocumentAdd size={size} className='text-[#97B749]'/>;
    } if (icon == 2) {
        icon = <MdOutlineCancel size={size} className='text-[#97B749]' />;
    } if (icon == 3) {
        icon = <RiHeartsFill size={size} className='text-[#97B749]'/>;
    } if (icon == 4) {
        icon = <HiOutlineDocumentSearch size={size} className='text-[#97B749]'/>;
    } if (icon == 5) {
        icon = <MdAssignmentReturn size={size} className='text-[#97B749]'/>;
    } if (icon == 6) {
        icon = <FaMoneyBillTransfer size={size}className='text-[#97B749]'/>;
    } if (icon == 7) {
        icon = <RiUserSharedFill size={size}className='text-[#97B749]'/>;
    } if (icon == 8) {
        icon = <GrDocumentUser size={size}className='text-[#97B749]'/>;
    } if (icon == 9) {
        icon = <BsFillPersonPlusFill size={size} className='text-[#97B749]'/>;
    } if (icon == 10) {
        icon = <MdOutlineSchool  size={size} className='text-[#97B749]'/>;
    }

    return (
        <div className="card" onClick={() => onCardClick(index)}>
            <Row>
                <Col span={24} className='flex flex-col items-center mt-6'>
                    <div className="card-title">{icon}</div>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='flex flex-col items-center mt-3'>
                    <div className="card-body break-words p-1">{title}</div>
                </Col>
            </Row>
        </div>
    );
}

export default CardComponent;