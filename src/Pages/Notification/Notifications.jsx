"use client";

import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Notification from '../../Components/Entrepreneur/Notification';

const Notifications = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <Notification/>
    </div>
  );
};

export default Notifications;