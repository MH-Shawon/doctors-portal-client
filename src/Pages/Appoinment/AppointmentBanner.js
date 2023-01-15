
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Chair from '../../assets/images/chair.png'


const AppointmentBanner = ({selected, setSelected}) => {
    

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={Chair} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        
                        />
                         
                </div>
               
            </div>
        </div>
    );
};

export default AppointmentBanner;