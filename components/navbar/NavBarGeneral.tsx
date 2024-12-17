import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import { JuniorsClubLogo } from './NavBarCourse';

const navBarItemStyle =
  'menu-item my-auto flex h-full items-center text-center text-base hover:border-b-4 hover:border-b-main-green hover:font-bold';

const NavbarGeneral = () => {
  const router = useRouter();
  return (
    <nav className='navbar mb-1.5 flex h-20 flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='flex h-full items-center'>
        <JuniorsClubLogo />
          <div className='main-nav-menu flex h-full items-center gap-6 pr-8'>
              <a href='/' className={`ml-7 ${navBarItemStyle}`}>
                  Home
              </a>

              <a href='/courses' className={`${navBarItemStyle}`}>
                  Courses
              </a>

              <a href='https://foodbank.sg/about/' className={`${navBarItemStyle}`}>
                About Us
              </a>

              <a href='https://foodbank.sg/advocacy/' className={navBarItemStyle}>
                What We Do
              </a>

              <a href='https://foodbank.sg/food-drive/' className={navBarItemStyle}>
                Deposit Food
              </a>

              <a href='https://foodbank.sg/time-based/' className={navBarItemStyle}>
                Volunteer
              </a>

              <a href='https://foodbank.sg/donate/' className={navBarItemStyle}>
                Donate
              </a>

              <a href='https://foodbank.sg/newsletter/' className={navBarItemStyle}>
                What&apos;s New
              </a>
          </div>
      </div>
        <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0 '>
        <Button onClick={() => router.push('/login')} className='w-28 border-[#4D4D4D] bg-[#4D4D4D] text-white hover:bg-[#797979]'>
          Log In
        </Button>
        <Button onClick={() => router.push('/sign-up')} className='border-main-green bg-main-green text-black hover:bg-[#c0f062]'>
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default NavbarGeneral;
