"use client";

import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Documents from '../../Components/Entrepreneur/Documents';

const DocumentsPage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <Documents/>
    </div>
  );
};

export default DocumentsPage;