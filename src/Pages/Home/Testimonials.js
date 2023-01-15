import React from 'react';
import quets from '../../assets/icons/quote.svg'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Review from './Review';
const Testimonials = () => {
    const reviews = [
        {
            _id:1,
            name: 'Mh Shawon',
            review: '',
            location: 'Cumilla',
            img: people1,
            
        },
        {
            _id:2,
            name: 'Mh Shawon',
            review: '',
            location: 'Cumilla',
            img: people2,
            
        },
        {
            _id:3,
            name: 'Mh Shawon',
            review: '',
            location: 'Cumilla',
            img: people3,
            
        }
    ]
    return (
        <section className='my-12'>
            <div  className='flex justify-between'>
                <div>
                    <h2 className="text-xl text-accent font-bold">Testimonials</h2>
                    <h2 className='text-3xl'>Whats our patients say</h2>
                </div>
                <div>
                    <img className='w-24 lg:w-48' src={quets} alt="" />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews.map(review=><Review
                    key={review._id}
                    review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonials;