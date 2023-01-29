import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import Treatment from './Treatment';
import Loading from '../Shared/Loading/Loading'
const AvaiableTreatments = ( { selected } ) =>
{
    
    const [ booking, setBooking ] = useState( null );
    const formattedDate = format( selected, 'PP' );
    const {data: treatments, isLoading, refetch} = useQuery( ['available', formattedDate], () =>fetch( `http://localhost:5000/availble?date=${ formattedDate }` )
            .then( res => res.json() )
     )

    if(isLoading){
        return <Loading></Loading>
    }

    

    return (
        <div>
            <div className='text-xl text-accent text-center'>
                Available Treatments on:
                <span className='text-red-400'> {format( selected, 'PP' )}.</span>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2, lg:grid-cols-3 gap-5'>
                    {
                        treatments.map( treatment => <Treatment
                            key={treatment._id}
                            treatment={treatment}
                            setBooking={setBooking}
                            refetch = {refetch}
                        ></Treatment> )
                    }
                </div>
                {booking && <BookingModal selected={selected} booking={booking} setBooking={setBooking}></BookingModal>}
            </div>
        </div>

    );
};

export default AvaiableTreatments;