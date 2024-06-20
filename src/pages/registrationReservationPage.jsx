
import Title from '../components/TitleComponent';
import FormSlotActivationComponent from '../components/FormSlotActivationComponent'

const registrationReservationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <Title title="Reserva" />
            <div>
                <FormSlotActivationComponent />
            </div>

        </div>

    )
}

export default registrationReservationPage;