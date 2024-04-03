import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { selectMyInfo } from '../../redux/formSlice'
import database from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { setFormData } from '../../redux/formSlice'

const Dashboard = () => {
  const profile = useSelector(selectMyInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const profileRef = ref(database, 'profile');
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setFormData(data));
    })
  }, [])
  
  return (
    <div className='flex flex-col font-mono'>
      <div className='flex justify-center items-center mt-10'>
        <div className='flex justify-center p-1 font-extrabold  bg-blue-400 w-[50%]'>
          Your Informations
        </div>
        <div className='bg-black p-2 cursor-pointer'>
          <Link to='/settings'>
            <FaRegEdit size={15} color="white" />
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex justify-evenly p-1 px-2 font-bold bg-yellow-400 w-[54%] lg:w-[52%]'>
          <p>Name:</p><span>{ profile.name }</span>
        </div>
        <div className='flex justify-evenly p-1 px-2 font-bold bg-red-400 w-[54%] lg:w-[52%]'>
          <p>Address:</p><span>{ profile.address }</span>
        </div>
      </div>
    </div>

  )
}

export default Dashboard