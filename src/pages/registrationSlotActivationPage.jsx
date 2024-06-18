
import Title from '../components/TitleComponent';
import FormSlotActivationComponent from '../components/FormSlotActivationComponent'

const RegistrationSlotActivationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <Title title="Activación de cupo" />
            <div>
                <FormSlotActivationComponent />
            </div>

        </div>

    )
}

export default RegistrationSlotActivationPage;