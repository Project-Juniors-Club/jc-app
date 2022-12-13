import React, { useState } from 'react';
import Image from 'next/image';
import DropDown from '../DropDown';

const NavBarCart = () => {
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  // TODO: ADD ASSET DROPDOWN
  const assetItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  const courseItems = [{ clickOption: 'Course Overview' }, { clickOption: 'Category Overview' }];

  return (
    <>
      <nav className='navbar flex flex-wrap items-center justify-between'>
        <div className='top-left'>
          <div className='logo'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu'>{/* TO ADD SEARCH BAR */}</div>
        </div>

        <div className='nav-action-menu'>
          <div className='top-right-elem'>
            <Image src={'/assets/logos/asset.svg'} width={24} height={24} alt='asset' />
            <DropDown buttonName={'Asset Management'} dropdownItems={assetItems}></DropDown>
          </div>

          <DropDown buttonName={'Course Management'} dropdownItems={courseItems}></DropDown>

          <div className='top-right-elem'>
            <Image src={'/assets/logos/user.svg'} width={36} height={41} alt='user' />
            <DropDown buttonName={'Username'} dropdownItems={loginItems}></DropDown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
