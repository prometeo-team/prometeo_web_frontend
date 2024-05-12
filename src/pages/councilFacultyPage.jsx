import { TitleComponent } from "../components/";
import NavbarFacultyComponent from '../components/NavbarFacultyComponent';

const CouncilFacultyPage = () => {
    return (
        <div>
            <div className="max-w-titleComponent">
                <TitleComponent title="Inicio de Acta" />
            </div>
            <div className="flex justify-center mt-4">
                <h1 className="font-bold text-xl">Seleccione el programa para revisar solicitudes:</h1>
            </div>
            <div className="mt-4 max-w-titleComponent">
                <NavbarFacultyComponent />
            </div>
            <div className="flex justify-center">
                <div className='legalization-container bg-white p-4 rounded-lg shadow-md m-5 w-1/2'>
                    <div className=" grid grid-cols-4 gap-4">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouncilFacultyPage;
