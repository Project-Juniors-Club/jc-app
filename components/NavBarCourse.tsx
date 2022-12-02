import React, { useState } from 'react';
import Image from 'next/image';
import DropDown from './DropDown';

const NavBarCart = () => {
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  const [isLoginOpen, setLoginOpen] = useState(false);
  // TODO: ADD ASSET DROPDOWN
  const assetItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  const [isAssetOpen, setAssetOpen] = useState(false);
  const courseItems = [{ clickOption: 'Course Overview' }, { clickOption: 'Category Overview' }];
  const [isCourseOpen, setCourseOpen] = useState(false);

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
            <DropDown buttonName={'Asset Management'} dropdownItems={assetItems} isOpen={isAssetOpen} setOpen={setAssetOpen}></DropDown>
          </div>

          <DropDown buttonName={'Course Management'} dropdownItems={courseItems} isOpen={isCourseOpen} setOpen={setCourseOpen}></DropDown>

          <div className='top-right-elem'>
            <Image src={'/assets/user.jpg'} width={36} height={41} alt='user' />
            <DropDown buttonName={'Username'} dropdownItems={loginItems} isOpen={isLoginOpen} setOpen={setLoginOpen}></DropDown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
