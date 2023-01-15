import React from 'react';
import doctor from '../../assets/images/doctor.png'
import bgImg from '../../assets/images/bg.png'
import Button from '../Shared/Button';

const MakeAppointment = () => {
    return (
        <section style={
            {backgroundImage:`url(${bgImg})`}
        }
        
        className='flex justify-center items-center rounded'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 px-2'>
                <h3 className='text-2xl font-bold text-accent py-2'>Appointment</h3>
                <h2 className='text-4xl text-white'>Make an Appointment Today</h2>
                <p className='text-white pb-3'>Doctors play a pivotal role in building the society. They are the lifelines of the community. This term can be used very literally for the Doctors who shape culture and save those that are diseased and unhealthy. Doctors work hard to save the lives of patients with serious ailments. They act as an inspiration to society.</p>
                <Button>make appointment</Button>
            </div>
        </section>
    );
};

export default MakeAppointment;