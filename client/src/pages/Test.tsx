import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { SERVER_URL, SUPABASE_URL } from '../lib/helpers';
import { useUserStore } from '../zustand/store';

export function Test() {
  const user = useUserStore((state: any) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const token = localStorage.getItem('token');
  const [profilePicture, setProfilePicture] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    setProfilePicture(
      `${SUPABASE_URL}/storage/v1/object/public/avatars/${user?.id}_avatar.jpg`
    );
  }, [user]);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post(
        `${SERVER_URL}/users/upload-profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUploadMessage('Profile picture uploaded successfully.');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploadMessage('Error uploading profile picture. Please try again.');
    }
  };

  return (
    <div>
      <img className='m-4 h-24 w-24 rounded-full' src={profilePicture} />
      <h2>Upload Profile Picture</h2>
      <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
              Drag & drop your profile picture here, or click to select a file
            </p>
          </div>
        )}
      </Dropzone>
      <button onClick={handleFileUpload}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}
