import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import UsersRow from './UsersRow';

const Users = () =>
{
    const { data: users, isLoading, refetch } = useQuery( 'users', () => fetch( 'https://fair-leotard-crow.cyclic.app/user',{
        method:'GET',
        headers:{
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
    } ).then( res => res.json() ) )
    if ( isLoading )
    {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">All Users:{users.length}</h2>
            <div  className="overflow-x-auto">
                <table  className="table w-full">
                    
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=><UsersRow
                            key={user._id}
                            user = {user}
                            index = {index}
                            refetch= {refetch}
                            ></UsersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;