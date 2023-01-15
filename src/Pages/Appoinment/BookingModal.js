import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ selected, booking,setBooking }) => {
    const { _id,name, slots } = booking;

    const handleBooking = event =>{
        event.preventDefault();
        const slot = event.target.slot.value;
        
        setBooking(null);
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className='font-bold text-accent text-lg justify-items-center'>Booking for:{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 justify-items-center mt-2'>
                        <input type="text" value={format(selected, 'PP')} disabled className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map(slot=><option  value={slot}>{slot}</option>)
                            }
                            
                        </select>
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='email' placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
                        <input type="number" name='phone' placeholder="Phone Number" className="input  input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" className="btn btn-accent w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;