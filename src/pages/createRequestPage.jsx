import { TitleComponent, RequestTypeComponent, NavbarComponent} from "../components/"


const CreateRequestPage = () => {

    const menuItems = [
        { name: 'Inicio'},
        { name: 'Mis Solicitudes'},
        { name: 'Crear Solicitud'},
        { name: 'Calendario Académico'},
        { name: 'Otras Solicitudes'},
        { name: 'Ayuda'}
    ];

    return (
        <div className="flex w-full h-full">  
            <NavbarComponent menuItems={menuItems}/> 
            <div>
                <TitleComponent title="Crear solicitud" />
                <RequestTypeComponent/>
            </div>

        </div>
    )
}

export default CreateRequestPage;