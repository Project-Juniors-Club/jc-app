import React from 'react';
import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';

const NavbarGeneral = () => {
  return (
    <Navbar className='navbar mb-1.5 flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-md'>
      <div className='h-[88px]flex-row flex'>
        <div className='logo flex h-[88px] flex-col items-center justify-center gap-2.5 p-4'>
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
        {/* TODO: INSERT BUTTONS HERE */}
        <div className='button flex h-[48px] w-[120px] flex-row items-center justify-center rounded-lg border border-black p-0'>
          <a href='#' className='mt-4 inline-block rounded border border-transparent px-4 py-2 text-sm leading-none text-black lg:mt-0'>
            Log In
          </a>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarGeneral;
