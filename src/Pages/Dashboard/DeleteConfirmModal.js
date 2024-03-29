import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({deletingDoctor, refetch, setDeletingDoctor }) => {
    const {name, email} = deletingDoctor;
    const handleDelete =()=>{
        fetch(`https://fair-leotard-crow.cyclic.app/doctor/${email}`,{
          method:'DELETE',
          headers:{
            authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if(data.deletedCount){
            toast.success(`Doctor: ${name} is deleted.`)
            setDeletingDoctor(null)

            refetch();
          }
        })
      }
    return (
        <div>

<input type="checkbox" id="confirm-delete-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-red-600">Are ypu sure you want to delete ${name}!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div class="modal-action">
    <button onClick={()=>handleDelete(email)} class="btn btn-xs btn-error">DELETE</button>
      <label for="confirm-delete-modal" class="btn btn-xs">Close</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default DeleteConfirmModal;