import UserCArdComponent from '../components/UserCardComponet';
import ChatSR from '../components/ComponentChat';
import Tittle from '../components/ComponentTittle2';
import './infoAdminRequestPage.css';
import { Button } from 'antd';
import { FileTextFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const InfoAdminRequestPage = () => {
    return (
        
        <div className="m-4 ml-10">
            <UserCArdComponent user= "Secretaria Academica"></UserCArdComponent>
        </div>
    )
}

export default InfoAdminRequestPage;
