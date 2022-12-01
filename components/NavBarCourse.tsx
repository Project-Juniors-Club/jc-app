import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import DropDown from './DropDown';

const NavBarCart = () => {
  const [isOpen, setOpen] = useState(false);
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  // TODO: ADD ASSET DROPDOWN
  const assetItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  const courseItems = [{ clickOption: 'Course Overview' }, { clickOption: 'Category Overview' }];

  return (
    <>
      <nav className='navbar flex items-center justify-between flex-wrap'>
        <div className='top-left'>
          <div className='logo'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu'>{/* TO ADD SEARCH BAR */}</div>
        </div>

        <div className='nav-action-menu'>
          <div className='top-right-elem'>
            <Image src={'/assets/book2.jpg'} width={24} height={24} alt='asset' />
            <DropDown header='Asset Management' dropdownItems={assetItems}></DropDown>
          </div>
          <DropDown header='Course Management' dropdownItems={courseItems}></DropDown>
          <DropDown header='Username' dropdownItems={loginItems}></DropDown>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
