import  TitleComponent  from "../components/TitleComponent";
import  FormAddition_CancelComponent from "../components/FormAddition_CancelComponent";

import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';
const registrationCancelPage = () => {

    return (
        <div className="h-screen scroll-container">
            <div className='w-full mt-4'>
                <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
            </div>
            <div>
                <TitleComponent title="Solicitud Retiro de créditos" />
            </div>
            <div>
                <FormAddition_CancelComponent type="Retiro de créditos" />
            </div>
        </div>

    )


}

export default registrationCancelPage;