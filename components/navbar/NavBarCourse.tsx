import Image from 'next/image';
import Link from 'next/link';
import DropDown from './DropDown';
import UserDropdown from './UserDropdown';

export const JuniorsClubLogo = () => {
  return (
    <Link href='/' className='logo flex flex-col items-center justify-center gap-2.5 p-4'>
      <Image className='cursor-pointer' src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
    </Link>
  );
};

const NavBarCourse = () => {
  // TODO: ADD ASSET DROPDOWN
  const assetItems = [{ clickOption: 'To add' }, { clickOption: 'To add' }];
  const courseItems = [{ clickOption: 'Course Overview' }, { clickOption: 'Category Overview' }];

  return (
    <nav className='navbar mb-1.5 flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-lg'>
      <div className='flex flex-row'>
        <JuniorsClubLogo />
        <div className='main-nav-menu flex flex-row items-center gap-6 pr-8'>{/* TO ADD SEARCH BAR */}</div>
      </div>

      <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0'>
        <div className='flex flex-row items-center gap-2 p-0'>
          <Image src={'/assets/logos/asset.svg'} width={24} height={24} alt='asset' />
          <DropDown buttonName={'Asset Management'} dropdownItems={assetItems}></DropDown>
        </div>

        <DropDown buttonName={'Course Management'} dropdownItems={courseItems}></DropDown>

        <UserDropdown />
      </div>
    </nav>
  );
};

export default NavBarCourse;
