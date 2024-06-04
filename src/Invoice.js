import React, { useEffect,useState,useRef } from 'react'
import { formatter } from './NumberFormatter';
import { ToWords } from 'to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Invoice = () => {
      const [invoiceData,setInvoiceData] = useState();
      const [items,setItems] = useState();
      let totalTax=0;;
      let totalAmount=0;
      const toWords = new ToWords();
      const webpageRef = useRef(null);

  const createPDF = () => {
    const webpage = webpageRef.current;
    html2canvas(webpage).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('webpage.pdf');
    });
  };
      
   useEffect(() =>{
         const data = JSON.parse(localStorage.getItem("invoiceData"));
         setInvoiceData(data);
         setItems(JSON.parse(data.items))
   },[])

   if(!invoiceData || !items){
       return (
           <div className='flex items-center justify-center'>
                       Loading...
           </div>
       )
      }

    console.log(items);
  return (
    <>
    <div ref={webpageRef} className="max-w-4xl h-screen mx-auto p-4 pt-6 mb-4 bg-white rounded shadow-md">
    <div className='flex items-center justify-between mb-4'>
        <img src="/logo.jpg" alt="logo" className='w-40 h-20 object-center roud'/>
        <div>
               <h2 className="text-lg font-bold mb-2">Tax Invoice/Bill of Supply/Cash Memo</h2>
                <p className="text-sm mb-4">(Original for Recipient)</p>
        </div>
    </div>
   

    <div className="flex justify-between mb-4">
      <div>
        <p className="text-sm font-bold ">Sold By:</p>
        <p className="text-sm ">{invoiceData["Seller Name"]}</p>
        <p className="text-sm">{invoiceData["Seller Address"]}</p>
        <p className="text-sm">{invoiceData["Seller City"]}, {invoiceData["Seller State,"]}</p>
        <p className="text-sm">{invoiceData["Seller Pincode"]}</p>
        <p className="text-sm">PAN No: {invoiceData["Seller PAN"]}</p>
        <p className="text-sm">GST Registration No: {invoiceData["Seller GST "]}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Billing Address:</p>
        <p className="text-sm ">{invoiceData["Billing Name"]}</p>
        <p className="text-sm">{invoiceData["Billing Address"]}</p>
        <p className="text-sm">{invoiceData["Billing City"]}, {invoiceData["Billing State"]}</p>
        <p className="text-sm">{invoiceData["Billing Pincode"]}</p>
      </div>
    </div>

    <div className="flex justify-between mb-4">

      <div>
        <div>
             <p className="text-sm font-bold  inline mr-1">Order Number:</p>
             <p className="text-sm inline mr-1">{invoiceData["OrderNo"]}</p>
        </div>
       <div>
               <p className="text-sm font-bold inline  mr-1">Order Date:</p>
               <p className="text-sm  inline mr-1">{invoiceData["OrderDate"]}</p>
       </div>
       <div>
               <p className="text-sm font-bold inline  mr-1">Invoice Number:</p>
               <p className="text-sm  inline mr-1">{invoiceData["InvoiceNo"]}</p>
       </div>
       <div>
               <p className="text-sm font-bold inline  mr-1">Invoice Details:</p>
               <p className="text-sm  inline mr-1">{invoiceData["InvoiceDetails"]}</p>
       </div>
       <div>
               <p className="text-sm font-bold inline  mr-1">Invoice Date:</p>
               <p className="text-sm  inline mr-1">{invoiceData["InvoiceDate"]}</p>
       </div>
      
      </div>
     
      <div>
        <p className="text-sm font-bold">Shipping Address:</p>
        <p className="text-sm ">{invoiceData["Shipping Name"]}</p>
        <p className="text-sm">{invoiceData["Shipping Address"]}</p>
        <p className="text-sm">{invoiceData["Shipping City"]}, {invoiceData["Shipping State"]}</p>
        <p className="text-sm">{invoiceData["Shipping Pincode"]}</p>
        <div>
               <p className="text-sm font-bold inline  mr-1">Place of supply:</p>
               <p className="text-sm  inline mr-1">{invoiceData["POS"]}</p>
       </div>
       <div>
               <p className="text-sm font-bold inline  mr-1">Place of delivery :</p>
               <p className="text-sm  inline mr-1">{invoiceData["POD"]}</p>
       </div>
      </div>
    </div>

    <table className="w-full mb-4 border border-1 border-zinc-900 text-center">
      <thead className='bg-zinc-400'>
        <tr>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black">SI. No</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black">Description</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black" >Unit Price</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black">Qty</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black" >Discount</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black" colSpan={2}>Tax</th>
          <th className="text-sm font-bold border border-b-1 border-r-1 border-black" colSpan={2}>Total Amount</th>
        </tr>
      </thead>
      <tbody>

       {items.map((item,i) =>{
                  totalTax+=item.tax;
                  totalAmount+=item.totalAmount;
                
         return(   <tr key={i}>
            <td className="text-sm border border-b-1 border-r-1 border-black">{i+1}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black">{item.description}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black" >{formatter.format(item.unitPrice)}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black" >{item.quantity}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black" >{formatter.format(item.discount)}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black" colSpan={2}>{formatter.format(item.tax)}</td>
            <td className="text-sm border border-b-1 border-r-1 border-black" colSpan={2}>{formatter.format(item.totalAmount)}</td>
          </tr>)
       })}
      
        <tr>
          <td className='col-span-7 border border-b-1 border-r-1 border-black text-start pl-4' colSpan={5}>Total:</td>
          <td className='col-span-7 border border-b-1 border-r-1 border-black' colSpan={2}>{formatter.format(totalTax)}</td>
          <td className='col-span-7 border border-b-1 border-r-1 border-black'>{formatter.format(totalAmount)}</td>
        </tr>
       
      </tbody>
    </table>

    <p className="text-sm mb-4"><span className='font-bold'>Amount in Words:</span> {toWords.convert(totalAmount)}</p>

     <div className='flex flex-col w-full items-end'>
              <p className="text-sm mb-4 font-bold">For Varasiddhi Silk Exports:</p>
               <img className='w-[100px] h-[100px]' src={invoiceData.Image}/>
              <p className="text-sm font-bold">Authorized Signatory</p>
     </div>
     
  </div>
  <button className='mx-auto bg-blue-500 p-4 rounded-md absolute left-1/2 bottom-8' onClick={() =>createPDF()}>Download</button>
  </>
  )
}

export default Invoice
