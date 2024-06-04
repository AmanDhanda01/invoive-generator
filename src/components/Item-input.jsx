import React,{useEffect, useState} from 'react'
import { debounce } from 'lodash';
import { formatter } from '../NumberFormatter';

const itemSchema = {
    description:"",
    unitPrice:"",
    quantity:"",
    discount:"",
    tax:"",
    netAmount:"",
    totalAmount:""
}

const  ItemInput = ({getValues,setValue,register}) => {
     const [listLength,setListLength] = useState(0);
     const [listItems,setListItems] = useState([]);
     const [itemData,setItemData] = useState({...itemSchema});
     useEffect(() =>{
         register("items");  
     })

     useEffect(()=>{
            setValue("items",JSON.stringify(listItems));
     },[listItems])

     useEffect(()=>{
             calculate();
     },[itemData.quantity,itemData.unitPrice,itemData.discount])


     
     const calculate = () =>{
        if(!itemData.quantity || !itemData.unitPrice) return;


        
        console.log(getValues());

         const POS = getValues().POS;
         const POD = getValues().POD;
         const discount = itemData.discount ?? 0;
         const netAmount = parseInt(itemData.unitPrice) * parseInt(itemData.quantity) - discount;
         let tax;
         if(POS===POD){
             tax= Math.ceil((netAmount*9)/100+(netAmount*9)/100)
         }else{
            tax = Math.ceil((netAmount*18)/100)
         }
         

         const totalAmount = tax+netAmount;
         setItemData((prev) =>({
                ...prev,netAmount,tax,totalAmount
         }));
     }
     const debounceCalculate = debounce(calculate,800);


     const handleChange = (e) =>{
        
        setItemData((prev) =>(
            {...itemData,[e.target.name]:e.target.value}
        ))
     }

     const addItems = () =>{
        if(!itemData.description || !itemData.unitPrice || !itemData.netAmount || !itemData.tax || !itemData.quantity) return;
         
        if(!itemData.discount) itemData.discount=0;

       

        setListItems((prev) =>(
            [...prev,itemData]
        ))
        setItemData({...itemSchema});
     }

  return (
    <div className='flex flex-col space-y-2'>
        <h2 className='text-lg font-bold'>Items</h2>
        <div className='grid grid-cols-12 gap-8 font-semibold'>
            <h3 className='col-span-6 text-sm'>Description</h3>
            <h3 className='text-sm text-center'>Unit Price</h3>
            <h3 className='text-sm text-center'>Quantity</h3>
            <h3 className='text-sm text-center'>Discount</h3>
            <h3 className='text-sm text-center'>Tax Amount</h3>
            <h3 className='text-sm text-center'>Net Amount</h3>
            <h3 className='text-sm text-center'>Total Amount</h3>

        </div>
        <div className='grid grid-cols-12 gap-6'>
               {listItems.length!==0 && listItems.map((item,index) =>  {
                   return (<>
                    <p className='text-sm col-span-6 '>{item.description}</p>
                    <p className='text-sm text-center'>{formatter.format(item.unitPrice)}</p>
                    <p className='text-sm text-center'>{item.quantity}</p>
                    <p className='text-sm text-center'>{formatter.format(item.discount)}</p>
                    <p className='text-sm text-center'>{formatter.format(item.tax)}</p>
                    <p className='text-sm text-center'>{formatter.format(item.netAmount)}</p>
                    <p className='text-sm text-center'>{formatter.format(item.totalAmount)}</p>
                   </>)
                   
               })}
        </div>
        <div className='grid grid-cols-12 gap-4'>
                  <input value={itemData.description} name='description'  onChange={(e) => handleChange(e)} type='text' className='text-sm pl-2 rounded-md focus:outline-none col-span-6'/>
                  <input value={itemData.unitPrice} name="unitPrice" onChange={(e) => handleChange(e)} type='text' className='text-sm pl-2 rounded-md focus:outline-none'/>
                  <input value={itemData.quantity} name="quantity" onChange={(e) => handleChange(e)}type='text' className='text-sm pl-2 rounded-md focus:outline-none'/>
                  <input value={itemData.discount} name='discount'  onChange={(e) => handleChange(e)}type='text' className='text-sm pl-2 rounded-md focus:outline-none'/>
                  <input value={itemData.tax} name="tax"  onChange={(e) => handleChange(e)} type='text' className='text-sm pl-2 rounded-md focus:outline-none pointer-events-none'/>
                  <input value={itemData.netAmount}  name='netAmount' onChange={(e) => handleChange(e)} type='text' className='text-sm pl-2 rounded-md focus:outline-none pointer-events-none'/>
                  <input value={itemData.totalAmount}  name='totalAmount' onChange={(e) => handleChange(e)} type='text' className='text-sm pl-2 rounded-md focus:outline-none pointer-events-none'/>

        </div>

        <div className='grid grid-cols-12 gap-x-4'>
            <div className='col-span-10'/>
            <p className='text-sm col-span-2 rounded-md bg-blue-500 p-2 cursor-pointer text-white text-center' onClick = {() =>addItems()}>Add Items</p>
        </div>


          
    </div>
  )
}

export default ItemInput
