import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyInfo, selectUpdated, uploadFormData } from '../../redux/formSlice';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom';

const Settings = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectMyInfo);
  const updated = useSelector(selectUpdated);

  const [formData, setFormData] = useState({
    name: profile.name,
    address: profile.address
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      dispatch(uploadFormData(formData));
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='relative flex flex-col items-center mt-10 bg-black text-white font-mono w-[40%] h-[230px] gap-2'>
          <Link to='/'>
            <IoMdArrowRoundBack size={20}  className='absolute left-4 top-5'/>
          </Link>
          <h1 className='font-extrabold pt-2 text-lg'>Edit Informations</h1>

        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-3 gap-3'>
          <label>
            <div className="flex flex-col justify-between">
              <p>Name:</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChanges}
                className='text-black pl-2 rounded-sm border-4 border-gray-600'
              />
            </div>
          </label>
          <label>
            <div className="flex flex-col justify-between">
              <p>Address:</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChanges}
                className='text-black pl-2 rounded-sm border-4 border-gray-600'
              />
            </div>
          </label>
          <button type="submit" className='bg-white text-black p-1 rounded-lg font-bold px-4'>Update</button>
        </form>

        {updated && 
        <p className='text-sm mt-3 font-bold bg-green-300 rounded-lg text-black p-2'>Information Updated Successfully!</p>
        }
      </div>


    </div>
  )
}

export default Settings