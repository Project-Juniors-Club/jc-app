import Image from 'next/image';
import { useState } from 'react';
import DropDown from '../DropDown';

const NavBarCart = () => {
  const [isOpen, setOpen] = useState(false);
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];

  return (
    <>
      <nav className='navbar flex items-center justify-between flex-wrap'>
        <div className='top-left'>
          <div className='logo'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu'>
            {/* TO ADD HYPERLINKS FOR EACH HEADER */}
            <a href='#' className='menu-item'>
              Explore Courses
            </a>
          </div>
        </div>

        <div className='nav-action-menu'>
          <div className='top-right-elem'>
            <Image src={'/assets/logos/course.svg'} width={24} height={24} alt='book' />
            <a href='#' className='menu-item'>
              My Learning
            </a>
          </div>
          <div className='top-right-elem'>
            <Image src={'/assets/logos/cart.svg'} width={24} height={24} alt='cart' />
            <a href='#' className='menu-item'>
              My Cart
            </a>
          </div>
          <div className='top-right-elem'>
            <Image src={'/assets/logos/user.svg'} width={36} height={41} alt='user' />
            <DropDown buttonName={'Username'} dropdownItems={loginItems} isOpen={isOpen} setOpen={setOpen}></DropDown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
