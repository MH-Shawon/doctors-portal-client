import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointment = () =>
{
    const [ appointments, setAppointment ] = useState( [] );
    const [ user ] = useAuthState( auth );
    const navigate = useNavigate();
    useEffect( () =>
    {
        if ( user )
        {
            fetch( `http://localhost:5000/booking?patient=${ user.email }`,{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${localStorage.getItem('accessToken')}`
                }
            } )
                .then( res => {
                    
                    if(res.status === 401 || res.status === 403){
                        navigate('/')
                        signOut(auth);
                        localStorage.removeItem('accessToken');

                    }
                   return res.json()
                })
                .then( data => {
                    setAppointment( data )
                });
        }

    }, [ user ] )
    return (
        <div>
            <h3>My Appointment:{appointments.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map( (appo, index) => <tr>
                                <th>{index+1}</th>
                                <td>{appo.patientName}</td>
                                <td>{appo.date}</td>
                                <td>{appo.slot}</td>
                                <td>{appo.treatment}</td>
                                <td>
                                    {(appo.price && !appo.paid) && <Link to={`/dashboard/payment/${appo._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link> }
                                    {(appo.price && appo.paid) && <span className='text-success'>Paid</span>}

                                    </td>
                            </tr> )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;