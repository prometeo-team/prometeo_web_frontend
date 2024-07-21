
import Title from '../components/TitleComponent';
import FormRefundComponent from '../components/FormRefundComponent'
import UserCardComponent from '../components/UserCardComponet';

const RegistrationLegalizationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <UserCardComponent  number={2} />
            <Title title="Reembolso" />
            <div>
                <FormRefundComponent />
            </div>

        </div>

    )
}

export default RegistrationLegalizationPage;