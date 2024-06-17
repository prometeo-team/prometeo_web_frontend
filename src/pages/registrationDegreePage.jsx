
import Title from '../components/TitleComponent';
import FormDegreeC from '../components/FormDegreeComponent'

const RegistrationDegreePage = () => {



    return (
        <div className='h-screen scroll-container ml-4'>
            <Title title="Postulacion a Grados" />
            <div>
                <FormDegreeC />
            </div>

        </div>

    )
}

export default RegistrationDegreePage;