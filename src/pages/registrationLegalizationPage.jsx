
import Title from '../components/TitleComponent';
import FormLegalizationC from '../components/FormLegalizationComponent'

const RegistrationLegalizationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <Title title="Legalización de matrícula" />
            <div>
                <FormLegalizationC />
            </div>

        </div>

    )
}

export default RegistrationLegalizationPage;