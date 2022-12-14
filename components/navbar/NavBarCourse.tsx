import Image from 'next/image';
import DropDown from '../DropDown';

const NavBarCart = () => {
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  // TODO: ADD ASSET DROPDOWN
  const assetItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];
  const courseItems = [{ clickOption: 'Course Overview' }, { clickOption: 'Category Overview' }];

  return (
    <>
      <nav className='navbar flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-md'>
        <div className='top-left flex flex-row'>
          <div className='logo flex flex-col items-center justify-center gap-2.5 p-4'>
            <Image src={'/logo/Juniors_Club_Logo.png'} width={92} height={72} alt='logo' />
          </div>
          <div className='main-nav-menu flex flex-row items-center gap-6 pr-8'>{/* TO ADD SEARCH BAR */}</div>
        </div>

        <div className='nav-action-menu order-1 flex flex-row items-center gap-6 p-0'>
          <div className='top-right-elem flex flex-row items-center gap-2 p-0'>
            <Image src={'/assets/logos/asset.svg'} width={24} height={24} alt='asset' />
            <DropDown buttonName={'Asset Management'} dropdownItems={assetItems}></DropDown>
          </div>

          <DropDown buttonName={'Course Management'} dropdownItems={courseItems}></DropDown>

          <div className='top-right-elem'>
            <Image src={'/assets/logos/user.svg'} width={36} height={41} alt='user' />
            <DropDown buttonName={'Username'} dropdownItems={loginItems}></DropDown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
