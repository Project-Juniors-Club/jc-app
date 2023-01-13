import Image from 'next/image';
import { Navbar } from 'react-bootstrap';
import UserDropdown from './UserDropdown';

const NavBarCart = () => {
  return (
    <Navbar className='navbar mb-1.5 flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='flex h-[88px] flex-row'>
        <div className='logo flex h-[88px] flex-col items-center justify-center gap-2.5 p-4'>
          {' '}
          <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
        </div>
        <div className='main-nav-menu flex flex-row items-center gap-6 pr-8'>
          {/* TO ADD HYPERLINKS FOR EACH HEADER */}
          <a href='#' className='menu-item text-base'>
            Explore Courses
          </a>
        </div>
      </div>

      <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0'>
        <div className='flex flex-row items-center gap-2 p-0'>
          <Image src={'/assets/logos/course.svg'} width={24} height={24} alt='book' />
          <a href='#' className='menu-item text-base'>
            My Learning
          </a>
        </div>
        <div className='flex flex-row items-center gap-2 p-0'>
          <Image src={'/assets/logos/cart.svg'} width={24} height={24} alt='cart' />
          <a href='#' className='menu-item text-base'>
            My Cart
          </a>
        </div>
        <UserDropdown />
      </div>
    </Navbar>
  );
};

export default NavBarCart;
