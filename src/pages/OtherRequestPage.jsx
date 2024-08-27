import React, { useEffect, useState } from "react";
import { TitleComponent } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import FormOtherRequestComponent from "../components/FormOtherRequestComponent";
import UserCArdComponent from '../components/UserCardComponet';
import ModalAskCarrer from '../components/ModalAskCarrer.jsx';
import '../App.css'
var carrera;
const OtherRequestPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
       
            setIsModalOpen(true);
        
      }, []);
    

    const handleModalConfirm = () => {
        carrera = document.getElementById('carrer_select').value;
        sessionStorage.setItem('Carrera', carrera);
        console.log('prueba osama'+carrera);
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
     };

    return (
        <>
        <ModalAskCarrer
            isVisible={isModalOpen}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
         />
        <div className="h-screen scroll-container">
                <div className='w-full mt-4'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Otras Solicitudes" />
                </div>
                <div>
                    <FormOtherRequestComponent carrer={carrera}/>
                </div>
        </div>
        </>

    )


}

export default OtherRequestPage;