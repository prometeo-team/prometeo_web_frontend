
import Title from '../components/TitleComponent';
import FormLegalizationC from '../components/FormLegalizationComponent'
import UserCardComponent from '../components/UserCardComponet';

const RegistrationLegalizationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>

            <div className="w-full  mt-6 scroll-container flex flex-col">
                <UserCardComponent user={'Secretaria academica'} number={2}></UserCardComponent>
                <Title title="Legalización de matrícula" />
                <div>
                    <FormLegalizationC />
                </div>

            </div>

        </div>

    )
}

export default RegistrationLegalizationPage;