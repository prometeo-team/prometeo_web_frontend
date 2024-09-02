import  TitleComponent  from "../components/TitleComponent";
import  FormAddition_CancelComponent from "../components/FormAddition_CancelComponent";

import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';
const registrationAdditionPage = () => {

    return (
        <div className=" h-screen scroll-container ml-4">
            <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
            <TitleComponent title="Solicitud Adición" />
            <div>
                <FormAddition_CancelComponent type="Adición de creditos" />
            </div>
        </div>

    )


}

export default registrationAdditionPage;