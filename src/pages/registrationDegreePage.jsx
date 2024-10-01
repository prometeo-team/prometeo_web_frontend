
import Title from '../components/TitleComponent';
import FormDegreeC from '../components/FormDegreeComponent'
import UserCArdComponent from '../components/UserCardComponet';

const RegistrationDegreePage = () => {



    return (
        <div className='h-screen scroll-container'>
            <UserCArdComponent user={'Pepito Perez'} number={2}></UserCArdComponent>
            <Title title="Postulación a grados" />
            <div>
                <FormDegreeC />
            </div>

        </div>

    )
}

export default RegistrationDegreePage;