import  TitleComponent  from "../components/TitleComponent";
import  FormConfigComponent from "../components/FormConfigComponent";

import UserCArdComponent from '../components/UserCardComponet';
import '../App.css';
const configDatePage = () => {

    return (
        <div className="flex mr-48 h-screen">
            <div className="w-full m-4 ml-10 flex flex-col scroll-container">
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
        </div>

    )


}

export default configDatePage;