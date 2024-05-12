import { TitleComponent, RequestTypeComponent } from "../components/"


const CreateRequestPage = () => {


    return (
        <div className="h-screen scroll-container">
            <TitleComponent title="Crear solicitud" />
            <RequestTypeComponent />
        </div>


    )
}

export default CreateRequestPage;