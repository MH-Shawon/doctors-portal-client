import React from 'react';

const Button = ({children}) => {
    return (
        <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500">{children}</button>
    );
};

export default Button;