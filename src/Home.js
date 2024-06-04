import { useForm } from "react-hook-form";
import Details from "./components/Details";
import ItemInput from "./components/Item-input";
import { Link, useNavigate } from "react-router-dom";
import ImageInput from "./components/ImageInput";

function Home() {
 const navigate = useNavigate();
  const {register,formState:{errors},handleSubmit,getValues,setValue} = useForm(); 
  const onSubmit = (data) =>{
       localStorage.setItem("invoiceData",JSON.stringify(data));
       navigate("/invoice");
  }
  return (
     <div className="bg-zinc-200 min-h-screen max-w-7xl mx-auto w-full  border-2 rounded-md">
         <div className="flex flex-col gap-4">
               <img src="/logo.jpg" alt="company-logo" className="w-40 h-40 object-center object-cover mx-auto rounded-full" />
               <h1 className="text-3xl text-center">Invoive Form</h1>
               <form  onSubmit ={handleSubmit(onSubmit)} className="space-y-3">
                    <Details Title={"Seller"} register={register} errors={errors}/>
                    <Details Title={"Shipping"} register={register} errors={errors}/>
                    <Details Title={"Billing"} register={register} errors={errors}/>
                    <div className="px-12 space-y-2">
                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Order Number: </p>
                             <input type='text' {...register("OrderNo")} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1' />
                        </label>
                        {errors.OrderNo && <span>{"This field is required"}</span> }
                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Order Date: </p>
                             <input type='text' {...register("OrderDate",{required:true})} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1' placeholder="DD-MM-YYYY" />
                        </label>
                        {errors.OrderDate && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Invoice Number: </p>
                             <input type='text' {...register("InvoiceNo",{required:true})} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1'  />
                        </label>
                        {errors.InvoiceNo && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Invoice Details: </p>
                             <input type='text' {...register("InvoiceDetails",{required:true})} className='w-52 h-6 rounded-md text-sm focus:outline-none pl-1' />
                        </label>
                        {errors.InvoiceDetails && <span className='text-red-500 text-sm'>{"This field is required"}</span> }
                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Invoice Date: </p>
                             <input type='text' {...register("InvoiceDate",{required:true})} className='relative w-52 h-6 rounded-md text-sm focus:outline-none pl-1' placeholder="DD-MM-YYYY" />
                        </label>
                        {errors.InvoiceDate && <span className="text-red-500 text-sm ">This field is required</span> }

                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Place of Supply: </p>
                             <input type='text' {...register("POS",{required:true})} className='relative w-52 h-6 rounded-md text-sm focus:outline-none pl-1' />
                        </label>
                        {errors.POS && <span className="text-red-500 text-sm ">This field is required</span> }

                        <label className='grid grid-cols-2 items-center'>
                             <p className='text-sm font-medium'> Place of Delivery: </p>
                             <input type='text' {...register("POD",{required:true})} className=' w-52 h-6 rounded-md text-sm focus:outline-none pl-1'/>
                        </label>
                        {errors.POD && <span className="text-red-500 text-sm ">This field is required</span> }

                        <ItemInput getValues={getValues} setValue={setValue} register={register}/>
                        <ImageInput register={register} setValue={setValue}/>

                    </div>
                  
                  <button className="bg-blue-500 rounded-md text-center w-20 text-white h-10 ml-10" type="submit">submit</button>

               </form>
             
         </div>
     </div>
  );
}

export default Home;
