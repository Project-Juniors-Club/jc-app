import React from 'react';
import Image from 'next/image';
import Button from '../Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarGeneral = () => {
  const router = useRouter();
  return (
    <nav className='navbar mb-1.5 flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='h-[88px]flex-row flex'>
        <Link href='/' className='logo flex h-[88px] flex-col items-center justify-center gap-2.5 p-4'>
          <Image className='cursor-pointer' src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
        </Link>
        <div className='main-nav-menu flex flex-row items-center gap-6 pr-8'>
          <a href='https://foodbank.sg/about/' className='menu-item ml-7 text-base'>
            About Us
          </a>

          <a href='https://foodbank.sg/advocacy/' className='menu-item text-base'>
            What We Do
          </a>

          <a href='https://foodbank.sg/food-drive/' className='menu-item text-base'>
            Deposit Food
          </a>

          <a href='https://foodbank.sg/time-based/' className='menu-item text-base'>
            Volunteer
          </a>

          <a href='https://foodbank.sg/donate/' className='menu-item text-base'>
            Donate
          </a>

          <a href='https://foodbank.sg/newsletter/' className='menu-item text-base'>
            What&apos;s New
          </a>
        </div>
      </div>
      <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0 '>
        <Button onClick={() => router.push('/login')} className='w-28 border-[#4D4D4D] bg-[#4D4D4D] text-white hover:bg-[#797979]'>
          Log In
        </Button>
        <Button onClick={() => router.push('/sign-up')} className='border-[#A9D357] bg-[#A9D357] text-black hover:bg-[#c0f062]'>
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default NavbarGeneral;
