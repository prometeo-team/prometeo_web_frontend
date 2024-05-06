import { FormIncapacityComponent, TitleComponent } from "../components";
import UserCArdComponent from '../components/UserCardComponet';

const incapacityPage = () => {

    return (
        <div className="flex mr-48">
            <div className="w-full m-4 ml-10 flex flex-col">
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