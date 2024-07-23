import  TitleComponent  from "../components/TitleComponent";
import  FormConfigComponent from "../components/FormConfigComponent";

import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';
const configDatePage = () => {

    return (
        <div className="w-full flex mr-24 max-md:mr-0 h-screen scroll-container flex-col">
                <div className='w-full'>
                    <UserCArdComponent number={2}></UserCArdComponent>
                </div>
                <div>
                    <TitleComponent title="Configuración" />
                </div>
                <div>
                    <FormConfigComponent type="Adición de creditos" />
                </div>
        </div>

    )


}

export default configDatePage;