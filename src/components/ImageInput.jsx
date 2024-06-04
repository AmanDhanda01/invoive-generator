import React, { useEffect, useRef, useState } from 'react';

const ImageInput = ({register,setValue}) => {
  const [image, setImage] = useState(null);
  const input = useRef();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setValue("Image",URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() =>{
    register("Image",{required:true})
  })

  const handleImagePreview = () => {
    if (image) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          style={{ width: '100px', height: '100px' }}
        />
      );
    } else {
      return <div>No image selected</div>;
    }
  };

  return (
    <div>
      <input ref={input} type="file" accept="image/*" className='hidden' onChange={handleImageChange} />
      <p>Please Add the Signature of Seller</p>
       <p className='bg-blue-500 mb-3 rounded-md text-white w-fit h-6 text-sm p-1 cursor-pointer text-center' onClick={() =>input.current.click()}>Select the Image</p>
      {handleImagePreview()}
    </div>
  );
};

export default ImageInput;