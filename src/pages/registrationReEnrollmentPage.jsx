
import Title from '../components/TitleComponent';
import FormReEnroolment from '../components/FormReEnrollmentComponent'
import UserCardComponent from '../components/UserCardComponet';

const RegistrationLegalizationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <UserCardComponent  number={2} />
            <Title title="Reintegro" />
            <div>
                <FormReEnroolment />
            </div>

        </div>

    )
}

export default RegistrationLegalizationPage;