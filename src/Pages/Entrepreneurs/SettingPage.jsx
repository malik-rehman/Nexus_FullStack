"use client";

import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Settings from '../../Components/Entrepreneur/Settings';

const SettingPage = () => {
  return (
    <div className='flex '>
        <Sidebar/>
        <Settings/>
    </div>
  );
};

export default SettingPage;