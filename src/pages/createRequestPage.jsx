import { TitleComponent, RequestTypeComponent } from "../components/"
import UserCardComponent from '../components/UserCardComponet';

const CreateRequestPage = () => {


    return (
        <div className="h-screen scroll-container">
            <UserCardComponent  number={2} />
            <TitleComponent title="Crear solicitud" />
            <RequestTypeComponent />

        </div>
        


    )
}

export default CreateRequestPage;