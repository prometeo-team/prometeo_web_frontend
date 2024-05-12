import { TitleComponent } from "../components/";
import NavbarFacultyComponent from '../components/NavbarFacultyComponent';
import { LuDownload } from "react-icons/lu";
import { BsChatLeftTextFill } from "react-icons/bs";
import { Button } from 'antd';
import ModalCouncilFacultyComponent from '../components/ModalCouncilFacultyComponent';
import { useState } from 'react';
import { LuUpload } from "react-icons/lu";

const CouncilFacultyPage = () => {
    const [modalVisible, setModalVisible] = useState(false);


    const handleOpenModal = () => {
        setModalVisible(true);

    };

    const handleCloseModal = () => {
        setModalVisible(false);

    };

    const handleDownload = async () => {
        try {
            const response = await fetch('URL_DEL_ARCHIVO', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            const a = document.createElement('a');
            a.href = url;
            a.download = 'Carte Reintegro';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

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
                <div className='councill-container bg-white p-4 rounded-lg shadow-md m-5 w-1/2'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Formato PROMETEO</h2>
                            <h2 className="mt-4">Descargue el formato en el cual se encuentran las solicitudes atendidas en el sistema Prometeo</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button
                                    onClick={handleDownload}
                                    className="w-full h-12 text-white rounded-lg shadow-md font-bold text-lg flex justify-between items-center mb-4 bg-red-700"
                                >
                                    Finalizar
                                </Button>
                            </div>
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center ">
                                    Descargar <LuDownload className="ml-2 h-7 w-7" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className='councill-container bg-white p-4 rounded-lg shadow-md m-5 w-1/2'>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <h2 className="flex font-bold"><BsChatLeftTextFill className="mr-2 h-5 w-5" />Formato general</h2>
                            <h2 className="mt-4">Descargue el formato general del acta que debe ser completado manualmente</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 gap-4 justify-center items-center">
                            <div>
                                <Button onClick={handleDownload} className="w-full h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center ">
                                    Descargar <LuDownload className="ml-2 h-7 w-7" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Button onClick={handleOpenModal} className="w-48 h-12 text-white rounded-lg shadow-md color-button font-bold text-lg flex justify-between items-center">
                            Subir acta <LuUpload className="ml-2 h-7 w-7" />
                        </Button>
                        <ModalCouncilFacultyComponent
                            visible={modalVisible}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouncilFacultyPage;
