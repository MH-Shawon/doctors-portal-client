import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Treatment from './Treatment';

const AvaiableTreatments = ({ selected }) => {
    const [treatments, setTreatment] = useState([]);
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => setTreatment(data))
    }, [])

    return (
        <div>
            <div className='text-xl text-accent text-center'>
                Available Treatments on:
                <span className='text-red-400'> {format(selected, 'PP')}.</span>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2, lg:grid-cols-3 gap-5'>
                    {
                        treatments.map(treatment => <Treatment
                            key={treatment._id}
                            treatment={treatment}
                            setBooking = {setBooking}
                        ></Treatment>)
                    }
                </div>
                {booking && <BookingModal selected={selected} booking={booking} setBooking={setBooking}></BookingModal>}
            </div>
        </div>

    );
};

export default AvaiableTreatments;