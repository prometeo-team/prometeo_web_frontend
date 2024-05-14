import { FormIncapacityComponent, TitleComponent } from "../components";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';

const incapacityPage = () => {

    return (
        <div className="flex mr-48 h-screen">
            <div className="w-full m-4 ml-10 flex flex-col scroll-container">
                <div className='w-full'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Solicitud Incapacidad" />
                </div>
                <div>
                    <FormIncapacityComponent />
                </div>
            </div>
        </div>

    )


}

export default incapacityPage;