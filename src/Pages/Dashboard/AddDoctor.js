
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () =>
{
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { data: services, isLoading } = useQuery( 'services', () => fetch( 'https://fair-leotard-crow.cyclic.app/service' ).then( res => res.json() )
    );

    const imageStorageKey = 'c577856be5b8c03054a37bce85fd5576'


    const onSubmit = async data =>
    {
        
        const image = data.image[ 0 ];
        const formData = new FormData();
        formData.append( 'image', image );
        const url = `https://api.imgbb.com/1/upload?key=${ imageStorageKey }`;
        fetch( url, {
            method: 'POST',
            body: formData
        } )
            .then( res => res.json() )
            .then( result =>
                { if ( result.success )
                {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img

                    }
                    
                    fetch( 'https://fair-leotard-crow.cyclic.app/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${ localStorage.getItem( 'accessToken' ) }`
                        },
                        body: JSON.stringify( doctor )
                    } )
                        .then( res => res.json() )
                        .then( inserted =>
                        {
                            
                            if ( inserted.insertedId )
                            {
                                toast.success( 'Successfully Doctor added' )
                                reset();
                            }
                            else
                            {
                                toast.error( "Failed to add the Doctor" )
                            }
                        } )
                }

            } )
    }

    if ( isLoading )
    {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl'>Add a new Doctor</h2>
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
                        <span className="label-text">Specialty</span>

                    </label>
                    <select {...register( "specialty" )} className="select select-bordered w-full max-w-xs">
                        {
                            services.map( service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option> )
                        }
                    </select>
                    <input type="file" className="file-input file-input-bordered  w-full max-w-xs mt-5"
                        {...register( "image", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        } )} />
                    <label className="label">
                        {errors.name?.type === 'required' && <p role="alert">{errors.name.message}</p>}

                    </label>
                </div>

                <input className='btn  btn-accent text-white w-full max-w-xs mt-2 ' type="submit" value='ADD' />

            </form>
        </div>
    );
};

export default AddDoctor;