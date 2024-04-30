import Navbar from "../components/NavbarComponent";

const requestManagement = () => {

    const menuItems = [
        { name: 'Gestión Solicitudes'},
        { name: 'Consejo Facultad'},
        { name: 'Tramite'},
        { name: 'Configuración'}

    ];

    return (
        <div className="requestManagement_container">
            <Navbar menuItems={menuItems}/>
        </div>
    )
}

export default requestManagement;