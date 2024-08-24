
import Title from '../components/TitleComponent';
import FormReservationComponent from '../components/FormReservationComponent'
import UserCardComponent from '../components/UserCardComponet';

const registrationReservationPage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <UserCardComponent  number={2} />
            <Title title="Reserva" />
            <div>
                <FormReservationComponent />
            </div>

        </div>

    )
}

export default registrationReservationPage;