import Image from 'next/image';
import Link from 'next/link';
import { JuniorsClubLogo } from './NavBarCourse';
import UserDropdown from './UserDropdown';

const navBarItemStyle =
  'menu-item my-auto flex h-full items-center text-center text-base hover:border-b-4 hover:border-b-main-green hover:font-bold';

const NavBarCart = () => {
  return (
    <nav className='navbar mb-1.5 flex h-20 flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='flex h-full flex-row'>
        <JuniorsClubLogo />

        <div className={`main-nav-menu ml-7 flex h-full items-center gap-6 ${navBarItemStyle}`}>
          <Link href='/courses' className='menu-item text-base'>
            Explore Courses
          </Link>
        </div>
      </div>

      <div className='nav-action-menu order-1 flex h-full flex-row items-center gap-6 p-0'>
        <div className={`flex flex-row items-center gap-2 p-0 ${navBarItemStyle}`}>
          <Image src={'/assets/logos/course.svg'} width={24} height={24} alt='book' />
          <Link href='/courses' className='menu-item text-base'>
            My Learning
          </Link>
        </div>
        <div className={`flex flex-row items-center gap-2 p-0 ${navBarItemStyle}`}>
          <Image src={'/assets/logos/cart.svg'} width={24} height={24} alt='cart' />
          <Link href='/view-cart' className='menu-item text-base'>
            My Cart
          </Link>
        </div>
        <UserDropdown />
      </div>
    </nav>
  );
};

export default NavBarCart;
