
import Title from '../components/TitleComponent';
import FormSlotActivationComponent from '../components/FormSlotActivationComponent'
import UserCardComponent from '../components/UserCardComponet';

const RegistrationSlotActivationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <UserCardComponent  number={2} />
            <Title title="Activación de cupo" />
            <div>
                <FormSlotActivationComponent />
            </div>

        </div>

    )
}

export default RegistrationSlotActivationPage;