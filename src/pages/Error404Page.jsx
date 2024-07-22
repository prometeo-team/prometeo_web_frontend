import imgError from '../assets/404-page-not-found-9.svg';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FloatButton } from 'antd';

const LoginPage = () => {
    return (
        <div className="flex items-center !justify-center min-h-screen w-11/12">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 h-screen">
                <img
                    src={imgError}
                    alt="Imagen 404"
                    className="img-logo-u w-full md:w-1/2 max-w-xs"
                />
                <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
                    <h1 className="text-4xl font-bold">Error 404</h1>
                    <p className="text-lg mt-4">Página no encontrada</p>
                    <Link to="/">
                        <FloatButton
                            tooltip={<div>volver</div>}
                            icon={<IoIosArrowBack className="iconButtonReturn" />}
                            className="button-return bg-[#97B749]"  
                            shape="circle"
                        />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;
