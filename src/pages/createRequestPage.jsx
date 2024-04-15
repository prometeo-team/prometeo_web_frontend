import { TitleComponent, RequestTypeComponent } from '../components/'

const CreateRequestPage = () => {
    return (
        <div className='mt-20'>
            <TitleComponent title="Crear solicitud" />
            <div className='requestContainer'>
                <RequestTypeComponent />
            </div>
        </div>
    )
}

export default CreateRequestPage