import React from 'react';
import flouride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import Service from '../ServiceCompo/Service';
const Services = () => {
    const services = [
        {
            _id:1,
            name: 'Fluoride Treatment',
            description: 'Fluoride treatments are typically professional treatments containing a high concentration of fluoride that a dentist or hygienist will apply to a person’s teeth to improve health and reduce the risk of cavities. These in-office treatments may take the form of a solution, gel, foam, or varnish',
            img: flouride
        },
        {
            _id:2,
            name: 'Cavity Filling',
            description: 'Fillings treat tooth decay, preventing further damage and tooth loss, as well as the possibility of pain and infection. A filling seals a hole, or cavity, in the tooth',
            img: cavity
        },
        {
            _id:3,
            name: 'Teeth Whitening',
            description: 'Teeth whitening involves bleaching your teeth to make them lighter. It cant make your teeth brilliant white, but it can lighten the existing colour by several shades',
            img: whitening
        },
    ]
    return (
        <div className='my-16'>
            <div className='text-center'>
                <h3 className='uppercase text-xl font-bold text-accent'>Our services</h3>
                <h2 className='text-2xl'>Services We Provide</h2>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {services.map(service=><Service
                key={service._id}
                service={service}
                ></Service>)}
            </div>

        </div>

    );
};

export default Services;