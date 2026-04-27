"use client";

import React from 'react';
import Sidebar from '../../Components/Sidebar';
import FindInvestor from '../../Components/Entrepreneur/FindInvestor';

const InvestorPage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <FindInvestor/>
    </div>
  );
};

export default InvestorPage;