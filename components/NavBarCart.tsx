import Image from 'next/image';
import DropDown from './DropDown';

const NavBarCart = () => {
  // const [isOpen, setOpen] = useState(false);
  const loginItems = [{ clickOption: 'My Profile' }, { clickOption: 'Log Out' }];

  // const handleDropDown = () => {
  //   setOpen(!isOpen);
  // };
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
            <Image src={'/assets/book.jpg'} width={24} height={24} alt='book' />
            <a href='#' className='menu-item'>
              My Learning
            </a>
          </div>
          <div className='top-right-elem'>
            <Image src={'/assets/cart.jpg'} width={24} height={24} alt='cart' />
            <a href='#' className='menu-item'>
              My Cart
            </a>
          </div>
          <div className='top-right-elem'>
            <Image src={'/assets/user.jpg'} width={36} height={41} alt='user' />
            {/* VERBOSE METHOD WHICH WORKS */}
            {/* <button className='text-black text-center inline-flex items-center' onClick={handleDropDown}>
              Username
              <svg
                className='ml-2 w-4 h-4'
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='/assets/dropdown.jpg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
              </svg>
            </button>

            <div id='dropdown' className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${isOpen ? 'block' : 'hidden'}`}>
              <ul className=' z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow '>
                <li>
                  <a href='#' className='block py-2 px-4 hover:bg-gray-100'>
                    My Profile
                  </a>
                </li>
                <li>
                  <a href='#' className='block py-2 px-4 hover:bg-gray-100'>
                    Log Out
                  </a>
                </li>
              </ul>
            </div> */}

            <DropDown header='Username' dropdownItems={loginItems}></DropDown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarCart;
