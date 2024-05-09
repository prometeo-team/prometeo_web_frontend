import { TitleComponent } from "../components";
import FormExtensionComponent from "../components/FormExtensionComponent";
import UserCArdComponent from '../components/UserCardComponet';

const ExtensionPage = () => {

    return (
        <div className="flex mr-5">
            <div className="w-full m-4 ml-10 flex flex-col">
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
