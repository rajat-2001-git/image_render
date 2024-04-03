import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAsync, selectIsFetching, setImages, selectIsUploaded, selectImages } from '../../redux/imageSlice';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const isFetching = useSelector(selectIsFetching);
  const isUploaded = useSelector(selectIsUploaded);

  const [preloaded, setPreloaded] = useState(false);
  const [imageNotSelected, setImageNotSelected] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);

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
  }, [isUploaded, dispatch]);

  useEffect(() => {
    if (isUploaded) {
      const preloadedImages = images.map((image) => {
        const img = new Image();
        img.src = image;

        return new Promise((resolve) => {
          img.onload = resolve;
        });
      });

      Promise.all(preloadedImages)
        .then(() => {
          setPreloaded(true);
        })
        .catch((error) => {
          console.error('Error preloading images:', error);
        });
    }
  }, [isUploaded, images]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setImageNotSelected(false);
  };

  const handleUpload = () => {
    if (uploadImage) {
      // Set isFetching to true before initiating the upload
      dispatch(uploadImageAsync(uploadImage));
    } else {
      setImageNotSelected(true);
    }
    setUploadImage(null);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center'>
        <h1 className="text-[60px] font-bold">Upload Image</h1>
      </div>
      <div className='my-10 bg-black text-white font-bold px-2 py-1 rounded-lg'>
        <Link to='/homepage'>
          <span>◄ </span>Go to Homepage
        </Link>
      </div>
      <div className='relative flex flex-col gap-10 bg-gray-800 rounded-lg text-white w-[350px] h-[350px] p-10 '>
        <input type='file' onChange={handleImageChange} />

        <div className='border-2 p-4 border-gray-400 rounded-lg my-3 border-dashed h-[160px]'>
          {uploadImage && (
            <img src={URL.createObjectURL(uploadImage)} alt='Uploaded' width={100} height={100} />
          )}
        </div>

        <button
          onClick={handleUpload}
          className='absolute bottom-3 right-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg p-2 font-bold'
        >
          Upload
        </button>
      </div>
      {isFetching && (
        (isUploaded && preloaded) ? null : (
          <p className='text-sm mt-3 font-bold bg-blue-200 rounded-lg p-2'>Uploading...</p>
        )
      )}
      {isUploaded && preloaded && (
        <p className='text-sm mt-3 font-bold bg-green-300 rounded-lg p-2'>Image Uploaded Successfully!</p>
      )}
      {imageNotSelected && (
        <p className='text-sm mt-3 font-bold bg-red-300 rounded-lg p-2'>Please Select An Image First!</p>
      )}
    </div>
  );
};

export default ImageUpload;
