import { sendEmailVerification } from 'firebase/auth';
import React from 'react';

import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading/Loading';

const SignUp = () =>
{
    const [ signInWithGoogle, gUser, gLoading, gError ] = useSignInWithGoogle( auth );
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword( auth, sendEmailVerification( true ) );

    const [ updateProfile, updating, upError ] = useUpdateProfile( auth );

    const navigate = useNavigate();

    const [ token ] = useToken( user || gUser );

    if ( loading || gLoading || updating )
    {

        return ( <Loading></Loading> )
    }

    let signInError;

    if ( error || gError || upError )
    {
        signInError = <p>{error?.message || gError?.message || upError?.message}</p>
    }

    if (token)
    {
        navigate('/appointment'); 
    }

    const onSubmit = async ( data ) =>
    {
        await createUserWithEmailAndPassword( data.email, data.password );
        await updateProfile( { displayName: data.name } );
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit( onSubmit )}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>

                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register( "name", {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                } )}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <p role="alert">{errors.name.message}</p>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register( "email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                } )}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <p role="alert">{errors.email.message}</p>}
                                {errors.email?.type === 'pattern' && <p role="alert">{errors.email.message}</p>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register( "password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password contains atleast 6 characters'
                                    }
                                } )}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <p role="alert">{errors.password.message}</p>}
                                {errors.password?.type === 'minLength' && <p role="alert">{errors.password.message}</p>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn btn-accent text-white w-full max-w-xs ' type="submit" value='Sign Up' />
                        <p><small>Already have an account? <Link className='text-accent' to='/login'> Please log in.</Link></small></p>
                    </form>

                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;