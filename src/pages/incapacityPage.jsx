import { FormIncapacityComponent, TitleComponent } from "../components";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';

const incapacityPage = () => {

    return (
        <div className=" h-screen scroll-container">
            <div className='w-full mt-4'>
                <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
            </div>
            <div>
                <TitleComponent title="Solicitud Incapacidad" />
            </div>
            <div>
                <FormIncapacityComponent />
            </div>
        </div>

    )


}

export default incapacityPage;