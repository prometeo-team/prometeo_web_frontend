
import Title from '../components/TitleComponent';
import FormRefundComponent from '../components/FormRefundComponent'

const RegistrationLegalizationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <Title title="Reembolso" />
            <div>
                <FormRefundComponent />
            </div>

        </div>

    )
}

export default RegistrationLegalizationPage;