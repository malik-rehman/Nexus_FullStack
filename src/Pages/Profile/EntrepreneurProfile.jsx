"use client";

import React from 'react';
import Profile from '../../Components/Entrepreneur/Profile';
import Sidebar from '../../Components/Sidebar';

const EntrepreneurProfile = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <Profile/>
    </div>
  );
};

export default EntrepreneurProfile;