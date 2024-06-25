import { TitleComponent } from "../components";
import FormOtherRequestComponent from "../components/FormOtherRequestComponent";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css'

const OtherRequestPage = () => {

    return (
        <div className="h-screen scroll-container">
                <div className='w-full mt-4'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Otras Solicitudes" />
                </div>
                <div>
                    <FormOtherRequestComponent />
                </div>
        </div>

    )


}

export default OtherRequestPage;