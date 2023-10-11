'use client'
import React, { useEffect, useState } from 'react'
import MyOrder from '@/Components/MyOrder';
import Carts from '@/Components/Carts';
import UserAddress from '@/Components/UserAddress';
import Userdata from '@/Components/Userdata';

function Page({ params }) {
  const { category } = params;
  return (
    <>
      {
        category === 'orders' ? <MyOrder /> :
          category === 'carts' ? <Carts /> :
            category === 'address' ? <UserAddress /> :
              category === 'userdata' ? <Userdata /> :
                category === 'password' ? <UserAddress /> :
                  category === 'signout' ? <UserAddress /> :
                    null
      }
    </>
  );
}

export default Page