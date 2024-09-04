import classNames from 'classnames';
import './NavbarTypeComponent.css';

function NavbarTypeComponent({ onClick }) {
    return (
        <>
        {/* Font */}
        <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="Navbar.css"></link>
        
        <div className={classNames('ml-8 max-md:m-0 w-11/12 max-md:w-full flex flex-row h-10')}>
            <div onClick={() => onClick('Adición de Créditos')} id='Adición de Créditos' name="process" className={classNames('max-md:w-2/4 w-1/6 text-hover rounded-s-full cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Adición</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('grid grid-flow-col-dense full-bar scroll-container2 w-full')}> 
                <div onClick={() => onClick('Retiro de Créditos')} id='Retiro de Créditos' name="process" className={classNames('w-full text-hover cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2 text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Cancelación</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Incapacidades Estudiantes')} id='Incapacidades Estudiantes' name="process" className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Incapacidades</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Supletorios')} id='Supletorios' name="process" className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Supletorios</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Postulación a Grados')} id='Postulación a Grados' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Grados</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Reintegro')} id='Reintegro' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Reintegro</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Reserva de Cupo')} id='Reserva de Cupo' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Reserva de Cupo</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Reembolso')} id='Reembolso' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Reembolso</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Legalización de matrícula')} id='Legalización de matrícula' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Legalización de matrícula</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Activación de Cupo')} id='Activación de Cupo' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Activación de Cupo</span>
                    <div className={classNames('v-line')}></div>
                </div>
                <div onClick={() => onClick('Otras solicitudes')} id='Otras solicitudes' name="process" className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Otras solicitudes</span>
                    <div className={classNames('v-line')}></div>
                </div>
            </div>
            <div onClick={() => onClick('all')} id="all" name="process" className={classNames('active max-md:w-2/4 w-1/6  text-hover  cursor-pointer full-bar text-center rounded-e-full flex flex-row items-center h-full justify-between')}>
                <span className={classNames('text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Todas</span>
            </div>
        </div>
        </>
    )
}
export default NavbarTypeComponent;