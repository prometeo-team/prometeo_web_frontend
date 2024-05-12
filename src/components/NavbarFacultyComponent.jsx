import { useState } from 'react';
import classNames from 'classnames';
import './NavbarTypeComponent.css';

function NavbarTypeComponent() {
    const [showPrograms, setShowPrograms] = useState(false);

    const togglePrograms = () => {
        setShowPrograms(!showPrograms);
    };

    return (
        <>
            {/* Font */}
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="Navbar.css"></link>

            <div className={classNames('ml-8 max-md:m-0 w-11/12 max-md:w-72 flex flex-row h-10 max-w-114.588px')}>
                <div onClick={togglePrograms} className={classNames('max-md:w-2/4 w-1/6 text-hover rounded-s-full cursor-pointer full-bar text-center flex flex-row items-center h-full justify-between')}>
                    <div className="text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
                        <span >Pregrado/</span>
                        <br className="block sm:hidden" /> {/* Oculta el salto de línea en dispositivos pequeños */}
                        <span className="hidden sm:inline">Posgrado</span>
                    </div>
                    <div className={classNames('v-line')}></div>
                </div>

                {showPrograms ? (
                    <>
                        <div className={classNames('grid grid-flow-col-dense full-bar scroll-container2 w-full')}>
                            <div className={classNames('w-full text-hover cursor-pointer text-center flex flex-row items-center h-full justify-between')}>
                                <span className={classNames('ml-2 mr-2 text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Posgrados de Bioingeniería</span>
                                <div className={classNames('v-line')}></div>
                            </div>
                            <div className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                                <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Posgrados Ingeniería Ambiental</span>
                                <div className={classNames('v-line')}></div>
                            </div>
                            <div className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                                <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Posgrados Ingeniería de Sistemas</span>
                                <div className={classNames('v-line')}></div>
                            </div>
                            <div className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                                <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Posgrados Ingeniería Electrónica</span>
                                <div className={classNames('v-line')}></div>
                            </div>
                            <div className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                                <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Posgrados Ingeniería Industrial</span>
                                <div className={classNames('v-line')}></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={classNames('grid grid-flow-col-dense full-bar scroll-container2 w-full')}>
                        <div className={classNames('w-full text-hover cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                            <span className={classNames('ml-2 mr-2 text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Bioingeniería</span>
                            <div className={classNames('v-line')}></div>
                        </div>
                        <div className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                            <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Ingeniería Ambiental</span>
                            <div className={classNames('v-line')}></div>
                        </div>
                        <div className={classNames('w-full text-hover  cursor-pointer text-center  flex flex-row items-center h-full justify-between')}>
                            <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Ingeniería de Sistemas</span>
                            <div className={classNames('v-line')}></div>
                        </div>
                        <div className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                            <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Ingeniería Electrónica</span>
                            <div className={classNames('v-line')}></div>
                        </div>
                        <div className={classNames('w-full text-hover  cursor-pointer  text-center  flex flex-row items-center h-full justify-between')}>
                            <span className={classNames('ml-2 mr-2  text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Ingeniería Industrial</span>
                            <div className={classNames('v-line')}></div>
                        </div>
                    </div>
                )}

                <div className={classNames('max-md:w-2/4 w-1/6 active:bg-gray-400 text-hover  cursor-pointer full-bar text-center rounded-e-full flex flex-row items-center h-full justify-between')}>
                    <span className={classNames('text-type transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300')}>Todos</span>
                </div>
            </div>
        </>
    );
}

export default NavbarTypeComponent;
