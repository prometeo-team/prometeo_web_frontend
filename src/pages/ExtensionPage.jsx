import { TitleComponent } from "../components";
import FormExtensionComponent from "../components/FormExtensionComponent";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';

const ExtensionPage = () => {

    return (
        <div className="h-screen scroll-container">
            <div className='w-full mt-4'>
                <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
            </div>
            <div>
                <TitleComponent title="Solicitud Supletorio" />
            </div>
            <div>
                <FormExtensionComponent />
            </div>
        </div>

    )


}

export default ExtensionPage;
