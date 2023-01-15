import React from 'react';
import Banner from './Banner';
import Footer from '../Shared/Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './ServiceCompo/Services';
import Terms from './Terms/Terms';
import Testimonials from './Testimonials';
import Appointment from '../Appoinment/Appointment';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <Terms></Terms>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            <Appointment></Appointment>
            <Footer></Footer>
        </div>
    );
};

export default Home;