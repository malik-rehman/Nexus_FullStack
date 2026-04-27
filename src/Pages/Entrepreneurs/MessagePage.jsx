"use client";

import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Messages from '../../Components/Entrepreneur/Messages';
const MessagePage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <Messages/>
    </div>
  );
};

export default MessagePage;