import Image from 'next/image';
import Link from 'next/link';
import { JuniorsClubLogo } from './NavBarCourse';
import UserDropdown from './UserDropdown';

const navBarItemStyle =
  'menu-item my-auto flex h-full items-center text-center text-base hover:border-b-4 hover:border-b-main-green hover:font-bold';

const NavBarAdmin = () => {
  return (
    <nav className='navbar mb-1.5 flex h-20 flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='flex h-full flex-row'>
        <JuniorsClubLogo />

        {/* TO UPDATE LINK */}
        <div className={`main-nav-menu ml-7 flex h-full items-center gap-6 ${navBarItemStyle}`}>
          <Link href='/courses' className='menu-item text-base'>
            User Management
          </Link>
        </div>

        {/* TO UPDATE LINK */}
        <div className={`main-nav-menu ml-7 flex h-full items-center gap-6 ${navBarItemStyle}`}>
          <Link href='/courses' className='menu-item text-base'>
            Transaction Management
          </Link>
        </div>

        {/* TO UPDATE LINK */}
        <div className={`main-nav-menu ml-7 flex h-full items-center gap-6 ${navBarItemStyle}`}>
          <Link href='/courses' className='menu-item text-base'>
            Customer Management
          </Link>
        </div>
        <div className={`main-nav-menu ml-7 flex h-full items-center gap-6 ${navBarItemStyle}`}>
          <Link href='/courses/staff' className='menu-item text-base'>
            Course Management
          </Link>
        </div>
      </div>
      <UserDropdown />
    </nav>
  );
};

export default NavBarAdmin;
