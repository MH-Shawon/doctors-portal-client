import React from 'react';
import { useAuthState, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase.init';


const ResetPassword = () =>
{
    const [ sendPasswordResetEmail, sending, error ] = useSendPasswordResetEmail( auth );

    const [ user ] = useAuthState( auth );
    const { register, formState: { errors }, handleSubmit } = useForm();
    if(user){
        sendPasswordResetEmail(user.email);
    }
    
    const onSubmit = async () =>{
      
         await sendPasswordResetEmail(user.email);
         
         
         
    }

    
    
    return (
        <div className="flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Forget Password</h2>
          <form onSubmit={handleSubmit( onSubmit )}>

            <div class="form-control w-full max-w-xs">
              
              <input
                type="email"
                placeholder="Provide Your Email"
                class="input input-bordered w-full max-w-xs"
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
              <label class="label">
                {errors.email?.type === 'required' && <p role="alert">{errors.email.message}</p>}
                {errors.email?.type === 'pattern' && <p role="alert">{errors.email.message}</p>}
              </label>
            </div>
           
            
            
            <input className='btn btn-outline text-white w-full max-w-xs ' type="submit" value='Reset Password' />

            
          </form>

          

          
        </div>
      </div>
    </div>
    );
};

export default ResetPassword;