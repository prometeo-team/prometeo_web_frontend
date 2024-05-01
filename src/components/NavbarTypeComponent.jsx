import classNames from 'classnames';
import './NavbarTypeComponent.css';

function NavbarTypeComponent() {
    return (
        <>
        {/* Font */}
        <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="Navbar.css"></link>
        
        <div className={classNames('ml-8 w-11/12 flex flex-row h-10')}>
            <div className={classNames('w-1/6 text-hover rounded-s-full cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Adición</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('w-1/6 text-hover  cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Cancelación</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('w-1/6 text-hover  cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Incapacidades</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('w-1/6 text-hover  cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Supletorios</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('w-1/6 text-hover  cursor-pointer full-bar text-center  flex flex-row items-center h-full justify-between')}>
                <span className={classNames(' text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Reintegro</span>
                <div className={classNames('v-line')}></div>
            </div>
            <div className={classNames('w-1/6 active:bg-gray-400 text-hover  cursor-pointer full-bar text-center rounded-e-full flex flex-row items-center h-full justify-between')}>
                <span className={classNames('text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Todas</span>
            </div>
        </div>
        </>
    )
}
export default NavbarTypeComponent;