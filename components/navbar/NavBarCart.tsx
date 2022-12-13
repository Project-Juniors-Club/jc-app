import Image from 'next/image';
import DropDown from '../DropDown';

const NavBarCart = () => {
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];

  return (
    <>
      <nav className='navbar flex flex-row flex-wrap items-center justify-between bg-white px-0 pr-12 pl-4 shadow-md'>
        <div className='top-left flex flex-row'>
          <div className='logo flex flex-col items-center justify-center gap-2.5 p-4'>
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
          <div className='top-right-elem'>
            <Image src={'/assets/logos/course.svg'} width={24} height={24} alt='book' />
            <a href='#' className='menu-item text-base'>
              My Learning
            </a>
          </div>
          <div className='top-right-elem flex flex-row items-center gap-2 p-0'>
            <Image src={'/assets/logos/cart.svg'} width={24} height={24} alt='cart' />
            <a href='#' className='menu-item text-base'>
              My Cart
            </a>
          </div>
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
