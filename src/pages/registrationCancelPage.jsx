import  TitleComponent  from "../components/TitleComponent";
import  FormAddition_CancelComponent from "../components/FormAddition_CancelComponent";

import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';
const registrationCancelPage = () => {

    return (
        <div className="flex mr-48 h-screen">
            <div className="w-full m-4 ml-10 flex flex-col scroll-container">
                <div className='w-full'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Solicitud Cancelación" />
                </div>
                <div>
                    <FormAddition_CancelComponent type="Cancelación de creditos" />
                </div>
            </div>
        </div>

    )


}

export default registrationCancelPage;