import { TitleComponent } from "../components";
import FormOtherRequestComponent from "../components/FormOtherRequestComponent";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css'

const OtherRequestPage = () => {

    return (
        <div className="flex mr-24 h-screen">
            <div className="w-full mt-6 scroll-container">
                <div className='w-full'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Otras Solicitudes" />
                </div>
                <div>
                    <FormOtherRequestComponent />
                </div>
            </div>
        </div>

    )


}

export default OtherRequestPage;