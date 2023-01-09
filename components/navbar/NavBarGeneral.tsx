import React from 'react';
import Image from 'next/image';
import Button from '../Button';

const NavbarGeneral = () => {
  return (
    <>
      <nav className='navbar flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-md'>
        <div className='flex h-[88px] w-[775px] flex-row'>
          <div className='logo flex h-[88px] w-[113px] flex-col items-center justify-center gap-2.5 p-4'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu flex flex-row items-center gap-6 pr-8'>
            {/* TO ADD HYPERLINKS FOR EACH HEADER */}
            <a href='#' className='menu-item text-base'>
              About Us
            </a>

            <a href='#' className='menu-item text-base'>
              What We Do
            </a>

            <a href='#' className='menu-item text-base'>
              Deposit Food
            </a>

            <a href='#' className='menu-item text-base'>
              Volunteer
            </a>

            <a href='#' className='menu-item text-base'>
              Donate
            </a>

            <a href='#' className='menu-item text-base'>
              What&apos;s New
            </a>
          </div>
        </div>
        <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0 '>
          {/* TODO: link buttons properly */}
          <Button className='w-28 border-[#4D4D4D] bg-[#4D4D4D] text-white hover:bg-[#797979]'>Log In</Button>
          <Button className='border-[#A9D357] bg-[#A9D357] text-black hover:bg-[#c0f062]'>Sign Up</Button>
        </div>
      </nav>
    </>
  );
};

export default NavbarGeneral;
