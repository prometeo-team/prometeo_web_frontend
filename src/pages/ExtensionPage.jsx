import { TitleComponent } from "../components";
import FormExtensionComponent from "../components/FormExtensionComponent";
import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';

const ExtensionPage = () => {

    return (
        <div className="flex mr-24 h-screen">
            <div className="w-full mt-6 scroll-container">
                <div className='w-full'>
                    <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Solicitud Supletorio" />
                </div>
                <div>
                    <FormExtensionComponent />
                </div>
            </div>
        </div>

    )


}

export default ExtensionPage;
