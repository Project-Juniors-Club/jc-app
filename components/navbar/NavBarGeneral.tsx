import React from 'react';
import Image from 'next/image';

const NavbarGeneral = () => {
  return (
    <>
      <nav className='navbar flex flex-row flex-wrap items-center justify-between'>
        <div className='top-left'>
          <div className='logo'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu'>
            {/* TO ADD HYPERLINKS FOR EACH HEADER */}
            <a href='#' className='menu-item'>
              About Us
            </a>

            <a href='#' className='menu-item'>
              What We Do
            </a>

            <a href='#' className='menu-item'>
              Deposit Food
            </a>

            <a href='#' className='menu-item'>
              Volunteer
            </a>

            <a href='#' className='menu-item'>
              Donate
            </a>

            <a href='#' className='menu-item'>
              What&apos;s New
            </a>
          </div>
        </div>
        <div className='nav-action-menu'>
          {/* TODO: INSERT BUTTONS HERE */}
          <div className='button'>
            <a href='#' className='mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-black lg:mt-0'>
              Log In
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarGeneral;
