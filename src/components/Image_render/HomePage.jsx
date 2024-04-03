import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { setImages, selectImages, selectIsUploaded } from '../../redux/imageSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const isUploaded = useSelector(selectIsUploaded);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, 'images');
      const imageList = await listAll(storageRef);
      const urls = await Promise.all(
        imageList.items.map(async (item) => await getDownloadURL(item))
      );

      dispatch(setImages(urls));
    }
    fetchImages();
  }, [isUploaded, images]);
  
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-[100px] font-bold">HomePage</h1>
      </div>
      <div className='mt-10 bg-black text-white font-bold px-2 py-1 rounded-lg'>
        <Link to='/upload'>Upload Image <span> ►</span></Link>
      </div>
      <div className='flex flex-wrap gap-4 justify-center items-center mt-10 w-[300px] h-[300px]'>
        {images.map((image, index) => (
          <img src={image} alt={`Image ${index}`} key={index} />
        ))}
      </div>
    </div>
  )
}
export default Homepage;