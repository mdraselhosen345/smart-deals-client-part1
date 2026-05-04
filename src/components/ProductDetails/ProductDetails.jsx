import React, { useContext, useEffect, useState, useRef } from 'react'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    // const {_id} = useLoaderData();
    const product = useLoaderData();
     const _id = product?._id;
    const bidModalRef = useRef(null)
    const { user } = useContext(AuthContext);
     const [bids, setBids] = useState([]);
  useEffect(() => {
      fetch(`http://localhost:3000/bids?product=${_id}`)
      .then(res => res.json())
      .then(data => {
        console.log('bids for this product', data)
        setBids(data);
      })
  }, [_id]);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

   const handleBidSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bids = e.target.bids.value;

    const productId = product?._id; // ✅ FIX HERE

    console.log(productId, name, email, bids);

    const newBid = {
        product: productId,
        buyer_name: name,
        buyer_email: email,
        buyer_image: user?.photoURL,
        bids_price: bids,
        status: 'pending'
    };

    fetch('http://localhost:3000/bids', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBid)
    })
    .then(res => res.json())
    .then(data => {
        if(data.insertedId){
            bidModalRef.current.close()

            Swal.fire({
            title: "Bid placed successfully!",
             icon: "success",
              draggable: true,
              timer: 1500
               });
               //add the new bid to the state
               newBid._id = data.insertedId;
               const updatedBids = [...bids, newBid];
               updatedBids.sort((a, b) => b.bids_price - a.bids_price)
               setBids(updatedBids);

        }
    });
}

  return (
    <div>
       {/* product info */}
       <div>
          <div>
             
          </div>
          <div>
            <button
                onClick={handleBidModalOpen}
             className="btn btn-primary">I want to by this product</button>


        <dialog ref={bidModalRef} className="modal">
           <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Give the best seller offer</h3>
                  <p className="py-4">Offer somerhing seller can not ressiss</p>
                {/* form section */}
                      <form onSubmit={handleBidSubmit}>
                          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                    <fieldset className="fieldset">
                                      {/* name */}
                                    <label className="label">Name</label>
                                    <input type="text" className="input" name='name'
                                     readOnly defaultValue={user?.displayName} />
                                       {/* email */}
                                    <label className="label">Email</label>
                                    <input type="text" className="input" name='email'
                                     readOnly defaultValue={user?.email} />
                                       {/* bids amaunt */}
                                    <label className="label"></label>
                                    <input type="text" className="input" name='bids'
                                     placeholder='Your Bids'
                                     />

                                  <button className="btn btn-neutral mt-4">Please Your Bids</button>
                               </fieldset>
                            </div>
                         </div>
                     </form>


              <div className="modal-action">
                   <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                       <button className="btn">Close</button>
                    </form>
    </div>
  </div>
         </dialog>
          </div>
       </div>
       {/* bids for this  products */}
       <div>
       <h3 className='text-3xl'>
  Bids for this Product: <span className='text-primary'>{bids.length}</span>
</h3>

        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          SL No.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
          bids.map((bid, index) => 
                    <tr>
        <th>
           {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
           {bid.buyer_email}
        </td>
        <td>{bid.bids_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
          )
        }

      {/* row 2 */}

    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
       </div>
    </div>
  )
}

export default ProductDetails
