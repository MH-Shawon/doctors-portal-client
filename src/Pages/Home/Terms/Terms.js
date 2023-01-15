import React from 'react';
import treatment from '../../../assets/images/treatment.png'
const Terms = () => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content px-12 flex-col lg:flex-row-reverse">
                <img className='max-w-sm rounded-lg shadow-2xl' src={treatment} />
                <div>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Terms;