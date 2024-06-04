import React from 'react'

const Details = ({Title,register,errors}) => {
  return (
    <div className='flex flex-col px-12'>
        <h2 className='text-lg font-semibold'>{Title +" Address:-"}</h2>
        <div className='px-8 space-y-2'>
           <label className='grid grid-cols-2  items-center'>
                <p className='text-sm'> Name: </p>
                <input type='text' {...register(`${Title} Name`,{required:true})} className='w-40 h-6 rounded-md text-sm focus:outline-none pl-1' />
            </label>
            {errors[`${Title} Name`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
            <label className='grid grid-cols-2 items-center'>
                <p className='text-sm'> Address: </p>
                <input type='text' {...register(`${Title} Address`,{required:true})} className='w-full h-6 rounded-md text-sm focus:outline-none pl-1' />
            </label>
            {errors[`${Title} Address`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
            <label className='grid grid-cols-2 items-center'>
                <p className='text-sm'> City: </p>
                <input type='text' {...register(`${Title} City`,{required:true})} className='w-28 h-6 rounded-md text-sm focus:outline-none pl-1' />
            </label>
            {errors[`${Title} City`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
            <label className='grid grid-cols-2 items-center'>
                <p className='text-sm'> State: </p>
                <input type='text' {...register(`${Title} State,`,{required:true})} className='w-28 h-6 rounded-md text-sm focus:outline-none pl-1' />
            </label>
            {errors[`${Title} State`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
            <label className='grid grid-cols-2 items-center'>
                <p className='text-sm'> Pincode: </p>
                <input type='text' {...register(`${Title} Pincode`,{required:true})} className='w-28 h-6 rounded-md text-sm focus:outline-none pl-1' />
            </label>
            {errors[`${Title} Pincode`] && <span className='text-red-500 text-sm' >{"This field is required"}</span> }
            {Title ==="Seller" && (<>
                <label className='grid grid-cols-2 items-center'>
                      <p className='text-sm'> PAN Number: </p>
                       <input type='text' {...register(`${Title} PAN`,{required:true})} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1' />
                </label>
                {errors[`${Title} PAN`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
                 <label className='grid grid-cols-2 items-center'>
                     <p className='text-sm'> GST Registration Number: </p>
                     <input type='text' {...register(`${Title} GST `,{required:true})} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1' />
                 </label>
                 {errors[`${Title} GST`] && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
            </>)}
        </div>


        
      
    </div>
  )
}

export default Details
