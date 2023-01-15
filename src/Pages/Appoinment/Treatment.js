import React from 'react';

const Treatment = ({ treatment, setBooking }) => {
    const { name, slots } = treatment;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="text-center card-body">
                <h2 className="card-title text-accent justify-center">{name}</h2>
                <p>
                    {slots.length > 0 ?
                        <span>{slots[0]}</span> :
                        <span className='text-red-500 text-sm'>Unavailble Slots</span>}
                </p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : ' space'} Available</p>
                <div className="card-actions justify-center">

                    <label htmlFor="booking-modal" disabled={slots.length === 0}
                        onClick={() => setBooking(treatment)}
                        className="btn btn-accent btn-sm uppercase">book appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Treatment;