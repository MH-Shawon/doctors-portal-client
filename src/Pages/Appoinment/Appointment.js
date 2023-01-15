import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvaiableTreatments from './AvaiableTreatments';

const Appointment = () => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div>
            <AppointmentBanner selected={selected} setSelected={setSelected}></AppointmentBanner>
            <AvaiableTreatments selected={selected}></AvaiableTreatments>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;