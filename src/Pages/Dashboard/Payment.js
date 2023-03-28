import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe( 'pk_test_51MqKGoCCiF9xmTvyyhaI20lttQRycwrTJ53Xul4BpMzuvV8TvYrxggvG7PdGwQgicO8sFiS4e6Ex1gr3EFZrpdbY00bypXU9BR' );

const Payment = () =>
{
    const { id } = useParams()
    const url = `http://localhost:5000/booking/${ id}`;
    const { data: appointment, isLoading } = useQuery( [ 'booking', id ], () => fetch( url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        }
    } ).then( res => res.json() ) );

    if ( isLoading )
    {
        return <Loading></Loading>
    }
    return (
        <div>

            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-16">
                <div class="card-body">
                    <p className='text-success'>Hello,{appointment.patientName}</p>
                    <h2 class="card-title"> Please pay for <span className='text-pink-500'>{appointment.treatment}</span></h2>
                    <p>We will see you on <span className='text-orange-500'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please pay: ${appointment.price}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>

                </div>
            </div>
        </div>

    );
};

export default Payment;