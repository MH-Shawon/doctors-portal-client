import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

import auth from '../../firebase.init';

const BookingModal = ( { selected, booking, setBooking,refetch } ) =>
{
    const { _id, name, slots } = booking;
    const [ user ] = useAuthState( auth );
    const formattedDate = format( selected, 'PP' );
    const handleBooking = event =>
    {
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log( _id, name, slot );
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value
        }


        fetch( 'http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
            
        } )
            .then( response => response.json() )
            .then( data => {
                
                if ( data.success )
                        {
        
                            toast.success( `Appointment is set , ${formattedDate} at ${slot}`);
                        }
                        else
                                {
                                    toast.error( `Already have an Appointment on ${ data.booking?.date } at ${data.booking?.slot }` );
                                }
                                refetch();
                            // to close modal 
                            setBooking( null );
            })

    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className='font-bold text-accent text-lg justify-items-center'>Booking htmlFor:{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 justify-items-center mt-2'>
                        <input type="text" value={format( selected, 'PP' )} disabled className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map( slot => <option

                                    value={slot}>{slot}</option> )
                            }

                        </select>
                        <input type="text" name='name' disabled value={user?.displayName} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='email' disabled value={user?.email} className="input input-bordered w-full max-w-xs" />
                        <input type="number" name='phone' placeholder="Phone Number" className="input  input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" className="btn btn-accent w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;