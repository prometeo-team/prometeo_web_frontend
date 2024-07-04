import Navbar from "../components/homePageNavbar";
import imgBackground from '../assets/engineer-home-page.jpg';
import logo from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import Calendar from '../components/CalendarComponent.jsx';

const HomePage = () => {
    return (
        <div className="w-full">
            <Navbar />
            <div className="relative">
                <img src={imgBackground} alt="Engineering Background" className="h-full filter blur-sm" />
                

                <div className="unilogo-container bg-[#97B749] p-4 rounded-2xl shadow-md m-5 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <img src={logo} alt="Engineering Background" className="max-h-72 w-auto" />
                </div>

                <div className="bg-[#97B749] p-4 rounded-2xl shadow-md m-5 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] sm:[calc(70%+4rem)] md:[calc(70%+4rem)] lg:[calc(70%+4rem)] xl:[calc(70%+4rem)] 2xl:[calc(70%+6rem)]">
                    <h1 className="font-bold text-white text-2xl sm:text-2xl md:text-4xl">CALENDARIO ACADEMICO</h1>
                </div>

            </div>
            <div className="councill-container bg-white p-4 rounded-lg shadow-md m-5 mt-20">
                <Calendar />
            </div>
        </div>
    );
}

export default HomePage;
