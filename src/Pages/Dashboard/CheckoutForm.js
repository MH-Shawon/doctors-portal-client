import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({appointment}) =>
{
    const stripe = useStripe();
    const elements = useElements();
    const [ cardError, setCardError ] = useState( '' )
    const [ success, setSuccess ] = useState( '' )
    const [clientSecret, setClientSecret] = useState('')

    const {price, patient, patientName} = appointment;

    useEffect( ()=>{
        fetch('http://localhost:5000/create-payment-intent',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({price})
        })
        .then(res=>res.json())
        .then(data=>{
            
            if(data?.clientSecret){
                setClientSecret(data.clientSecret)
            }
            
        });
    },[price])
    const handleSubmit = async ( event ) =>
    {

        event.preventDefault();

        if ( !stripe || !elements )
        {
            return;
        }

        const card = elements.getElement( CardElement );

        if ( card === null )
        {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod( {
            type: 'card',
            card,
        } );

        setCardError(error?.message || '');
        setSuccess('');
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patientName,
                  email: patient
                },
              },
            },
          );
        if(intentError){
            setCardError(intentError?.message);
        }
        else{
            setCardError('');
            console.log(paymentIntent)
            setSuccess('Congrats! Your payment is completed.');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'white',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: 'red',
                            },
                        },
                    }}
                />
                <button className='btn btn-xs btn-success mt-2' type="submit" disabled={!stripe && !clientSecret}>
                    Pay
                </button>
            </form>

            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
            {
                success && <p className='text-green-600'>{success}</p>
            }
            
        </>
    );
};

export default CheckoutForm;